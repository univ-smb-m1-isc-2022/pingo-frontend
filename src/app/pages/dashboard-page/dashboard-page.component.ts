import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridService } from 'src/app/services/grid-service/grid.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  gridList!: Array<any>;

  constructor(private route: ActivatedRoute, private gridService: GridService) { }

  ngOnInit() {
    this.gridList = this.route.snapshot.data['gridList'].body;
  }

  onGridDeleteClick(url_code: string, index: number) {
    this.gridList.splice(index, 1);
    this.gridService.deleteGrid(url_code).subscribe();
  }

}
