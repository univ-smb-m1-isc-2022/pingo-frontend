import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { GridSaveService } from 'src/app/services/grid-save/grid-save.service';
import { GridWSService } from 'src/app/services/grid-ws/grid-ws.service';

@Component({
  selector: 'app-play-grid',
  templateUrl: './play-grid.component.html',
  styleUrls: ['./play-grid.component.scss']
})
export class PlayGridComponent {
  authUser?: any;
  alreadyExistingSaveInServer?: boolean;
  grid: any;
  gridCompletion: Map<number, boolean> = new Map();

  // Preserve original property order
  originalOrder = (a: KeyValue<number, boolean>, b: KeyValue<number, boolean>): number => {
    return 0;
  }

  constructor(private route: ActivatedRoute, private gridSaveService: GridSaveService, private gridWsService: GridWSService, private alertService: AlertService) { }

  ngOnInit() {
    this.grid = this.route.snapshot.data['grid'].body;

    if (this.route.snapshot.data['authUser'])
      this.authUser = this.route.snapshot.data['authUser'].body;

    this.gridWsService.createWsConnection(this.grid.urlCode,
      this.authUser ? this.authUser.username : 'Anonymous',
      (wsMessage: any) => {this.alertService.sendAlert({type: 'info', message: `Wow ! ${wsMessage.from} got a bingo !`});}
    );

    this.loadSyncedGridCompletion();
  }

  generateFreshGridCompletion() {
    var remainingGridData: Array<number> = [...Array(this.grid.gridData.length).keys()];

    for (var i = 0; i < this.grid.dim * this.grid.dim; i++) {
      const index = Math.floor(Math.random() * remainingGridData.length);
      this.gridCompletion.set(remainingGridData[index], false);
      remainingGridData.splice(index, 1);
    }
  }

  checkBox(boxIndex: number) {
    if (!this.gridCompletion.has(boxIndex))
      return;

    this.gridCompletion.set(boxIndex, !this.gridCompletion.get(boxIndex));


    if (this.checkBingo()) {
      this.gridWsService.sendBingoNotification(this.grid.urlCode);
      this.alertService.sendAlert({ type: 'success', message: "Congratulations ! You got a Bingo !"});
    }


    this.saveGridCompletion()
  }

  getIthElement(map: Map<any, any>, i: number) {
    const arr = Array.from(map.entries());
    return arr[i];
  }

  checkBingo() {
    var dim = this.grid.dim;

    // Check horizontal lines
    for (let i = 0; i < dim * dim; i += dim) {
      let isBingo = true;
      for (let j = i; j < i + dim; j++) {
        if (!this.getIthElement(this.gridCompletion, j)[1]) {
          isBingo = false;
          break;
        }
      }
      if (isBingo) {
        return true;
      }
    }

    // Check vertical lines
    for (let i = 0; i < dim; i++) {
      let isBingo = true;
      for (let j = i; j < dim * dim; j += dim) {
        if (!this.getIthElement(this.gridCompletion, j)[1]) {
          isBingo = false;
          break;
        }
      }
      if (isBingo) {
        return true;
      }
    }

    // Check diagonal lines
    let isBingo = true;
    for (let i = 0; i < dim * dim; i += dim + 1) {
      if (!this.getIthElement(this.gridCompletion, i)[1]) {
        isBingo = false;
        break;
      }
    }
    if (isBingo) {
      return true;
    }

    isBingo = true;
    for (let i = dim - 1; i <= dim * (dim - 1); i += dim - 1) {
      if (!this.getIthElement(this.gridCompletion, i)[1]) {
        isBingo = false;
        break;
      }
    }
    if (isBingo) {
      return true;
    }

    return false;
  }

  saveGridCompletion() {
    const gridSavesString = localStorage.getItem("gridSaves");
    let gridSaves: Map<String, any>;
    if (!gridSavesString) {
      gridSaves = new Map<String, any>;
    } else {
      gridSaves = JSON.parse(gridSavesString, this.reviver);
    }

    gridSaves.set(this.grid.urlCode, this.gridCompletion);

    localStorage.setItem("gridSaves", JSON.stringify(gridSaves, this.replacer));

    if (this.authUser) {
      if (this.alreadyExistingSaveInServer) {
        this.gridSaveService.modifyGridSave(JSON.stringify(this.gridCompletion, this.replacer), this.authUser.id, this.grid.urlCode).subscribe(() => {
          this.alreadyExistingSaveInServer = true;
        });
      } else {
        this.gridSaveService.saveGridSave(JSON.stringify(this.gridCompletion, this.replacer), this.authUser.id, this.grid.urlCode).subscribe();
      }
    }
  }

  loadSyncedGridCompletion() {

    if (this.authUser) {
      this.gridSaveService.getGridSave(this.authUser.id, this.grid.urlCode).subscribe({
        error: () => this.loadLocalGridCompletion(),
        next: (response) => {
          this.gridCompletion = JSON.parse((response.body as any).gridCompletion, this.reviver);
          this.alreadyExistingSaveInServer = true;
          this.saveGridCompletion();
        }
      });
    } else {
      this.loadLocalGridCompletion();
    }
  }

  loadLocalGridCompletion() {
    const gridSavesString = localStorage.getItem("gridSaves");
    if (!gridSavesString) {
      console.log("no existing saves");
      this.generateFreshGridCompletion();
      return;
    }

    const gridSaves = JSON.parse(gridSavesString, this.reviver);

    if (!gridSaves.has(this.grid.urlCode)) {
      console.log("specific save not found");
      this.generateFreshGridCompletion();
      return;
    }

    this.gridCompletion = gridSaves.get(this.grid.urlCode);
  }

  replacer(key: any, value: any) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()),
      };
    }
    return value;
  }

  reviver(key: any, value: any) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }


}
