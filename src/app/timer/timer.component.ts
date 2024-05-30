import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit, OnDestroy {
  @Output() gameTimer = new EventEmitter<number>();

  @Input() totalTime = 0;
  currentTimeLeft = 0;

  timeLeftInterval?: any;

  timeLeft() {
    this.currentTimeLeft = this.currentTimeLeft - 1;
    this.gameTimer.emit(this.currentTimeLeft);
    if ((this.currentTimeLeft == 0)) {
      clearInterval(this.timeLeftInterval);
    }
  }

  ngOnInit(): void {
    this.currentTimeLeft = this.totalTime;
    this.timeLeftInterval = setInterval(() => this.timeLeft(), 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.timeLeftInterval);
  }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
