// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Sep 3, 2021'),
// });

//Для подсчета значений используй следующие готовые формулы,
//где time - разница между targetDate и текущей датой.

/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

// /*
//  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//  * остатка % и делим его на количество миллисекунд в одном часе
//  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// /*
//  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//  */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// /*
//  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//  * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

const refs = {
  clockface: document.querySelector('#timer-1'),
  timerDays: document.querySelector('[data-value="days"]'),
  timerHours: document.querySelector('[data-value="hours"]'),
  timerMins: document.querySelector('[data-value="mins"]'),
  timerSecs: document.querySelector('[data-value="secs"]'),
};

class Timer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
  }

  init() {
    const time = this.getTimeComponents(0);
    this.updateClockface(time);
  }

  start() {
    const startTime = Date.now();
    const deltaTime = this.targetDate - startTime;
    const time = this.getTimeComponents(deltaTime);
    this.updateClockface(time);

    if (deltaTime <= 0) {
      clearInterval(this.intervalID);
      this.init();
      refs.clockface.textContent = 'your timer finished successfully';
      return;
    }
  }

  goTimer() {
    this.start();

    this.intervalId = setInterval(() => {
      this.start();
    }, 1000);
  }

  updateClockface({ days, hours, mins, secs }) {
    refs.timerDays.textContent = `${days}`;
    refs.timerHours.textContent = `${hours}`;
    refs.timerMins.textContent = `${mins}`;
    refs.timerSecs.textContent = `${secs}`;
    // refs.clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  selector: '#timer-1',
  targetDate: new Date('sep 3, 2021'),
});

timer.goTimer();
