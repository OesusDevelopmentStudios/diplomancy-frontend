/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Ww1Component } from './ww1.component';

describe('Ww1Component', () => {
    let component: Ww1Component;
    let fixture: ComponentFixture<Ww1Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ Ww1Component ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Ww1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => { expect(component).toBeTruthy(); });
});
