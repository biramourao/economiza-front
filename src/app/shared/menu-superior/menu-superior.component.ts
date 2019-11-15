import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { GlobalConstantsService } from '../global-constants.service';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})

export class MenuSuperiorComponent implements OnInit {

  constructor(private apiService: ApiService, public globalConstants: GlobalConstantsService) { }

  ngOnInit(
  ) {
  }
}
