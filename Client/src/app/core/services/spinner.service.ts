import { Injectable } from '@angular/core';  
import { ContainerComponent, SpinnerComponent } from '../components';

@Injectable()
export class SpinnerService {  
  private spinnerComponent: SpinnerComponent;
  private containerComponent: ContainerComponent;
  
  _registerSpinner(spinner: SpinnerComponent): void {
    this.spinnerComponent = spinner;
  }
  
  _registerContainer(container: ContainerComponent): void {
    this.containerComponent = container;
  }

  show(): void {
    this.spinnerComponent.show = true;
    this.containerComponent.showContainer = false;
  }

  hide(): void {
    this.spinnerComponent.show = false;
    this.containerComponent.showContainer = true;
  }
}