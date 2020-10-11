import {
  Component,
  OnInit,
  Input,
  Inject,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
declare var $: any;
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private canvasCtx: CanvasRenderingContext2D;
  title = 'angular-pattern';
  lastSelection: any;

  tiles = [
    { text: 'A', isSelected: false, id: UUID.UUID() },
    { text: 'B', isSelected: false, id: UUID.UUID() },
    { text: 'C', isSelected: false, id: UUID.UUID() },
    { text: 'D', isSelected: false, id: UUID.UUID() },
    { text: 'E', isSelected: false, id: UUID.UUID() },
    { text: 'F', isSelected: false, id: UUID.UUID() },
    { text: 'G', isSelected: false, id: UUID.UUID() },
    { text: 'H', isSelected: false, id: UUID.UUID() },
    { text: 'I', isSelected: false, id: UUID.UUID() },
  ];

  ngOnInit() {
    this.canvasCtx = this.canvas.nativeElement.getContext('2d');
  }

  reset(){
    this.canvasCtx.restore();
    this.ngOnInit();
  }

  getXYCoordinates(e, index, currentValue) {
    console.log(e, index, currentValue);
    this.tiles[index].isSelected = true;
    this.selectAnswer(e, currentValue);
  }

  drawLine(p1, p2) {
    this.canvasCtx.beginPath();
    this.canvasCtx.lineWidth = 15;
    this.canvasCtx.strokeStyle = '#008080';
    this.canvasCtx.moveTo(p1.x, p1.y);
    this.canvasCtx.lineTo(p2.x, p2.y);
    this.canvasCtx.stroke();
  }

  selectAnswer(event, currentValue) {
    if (!this.lastSelection) {
      this.lastSelection = { event, currentValue };
    } else {
      const currentClick = this.getPoint(event, currentValue);
      const lastSelection = this.getPoint(
        this.lastSelection.event,
        this.lastSelection.currentValue
      );
      this.drawLine(currentClick, lastSelection);
      this.lastSelection = { event, currentValue };
    }
  }

  getPoint(e, currentValue) {
    return {
      y:
        $(`#${currentValue.id}`).position().top +
        $(`#${currentValue.id}`).outerHeight(true) / 2,
      x:
        $(`#${currentValue.id}`).position().left +
        $(`#${currentValue.id}`).outerWidth(true) / 2,
    };
  }

  resetCanvas() {
    this.lastSelection = null;
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }
}
