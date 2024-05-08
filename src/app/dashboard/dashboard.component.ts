import { Component, Input, OnInit } from '@angular/core';
import { PointsService } from '../services/points.service';
import { GamePlayed } from '../../shared/model/gameplayed';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  pointsMap:GamePlayed[]=[]
  
  constructor(private PointsService:PointsService) {}
  ngOnInit(): void {
    
  this.pointsMap = this.PointsService.list()
 
  }
  
}
