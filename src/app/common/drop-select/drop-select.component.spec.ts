/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DropSelectComponent } from './drop-select.component';

describe('DropSelectComponent', () => {
    let component: DropSelectComponent;
    let fixture: ComponentFixture<DropSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DropSelectComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DropSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => { expect(component).toBeTruthy(); });
});
