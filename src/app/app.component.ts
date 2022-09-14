import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public datapoints = 1000;
  private width = 800;
  private height = 800;
  private xCornersForObject = 100;
  title = 'spiral';
  ngAfterViewInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.lineWidth = 5;
    this.draw();
  }
  draw() {
    let radius = 0;
    let angle = 0;
    this.context.strokeStyle = '#0096FF';
    this.context.beginPath();
    this.context.moveTo(
      this.canvas.nativeElement.width / 2,
      this.canvas.nativeElement.height / 2
    );
    for (let n = 0; n < this.datapoints; n++) {
      radius += 0.75;
      // make a complete "circle" every xCornersForObject iterations
      angle += (Math.PI * 2) / this.xCornersForObject;
      const x = this.canvas.nativeElement.width / 2 + radius * Math.cos(angle);
      const y = this.canvas.nativeElement.height / 2 + radius * Math.sin(angle);
      this.context.textAlign = 'center';
      this.context.globalCompositeOperation = 'destination-over';
      this.context.fillText(n.toString(), x, y);
      this.context.lineTo(x, y);
    }

    this.context.stroke();
  }
}
