import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/Router';
@Component({
  selector: 'st-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private _router:Router,
              private _authService: AuthenticationService) { }
  ngOnInit() {
    
  }



}
