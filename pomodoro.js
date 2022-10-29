$(document).ready(function() {
  const semicircles = document.querySelectorAll(".semicircle");
  const timer = document.querySelector(".timer");

  const hr = 0;
  const min = 0;
  const sec = 10;

  timer.innerHTML = `
      <div>${hr.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}</div>
      <div class="colon">:</div>
      <div>${min.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}</div>
      <div class="colon">:</div>
      <div>${sec.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}</div>
      `;

  let timerLoop;
  let futureTime, setTime;
      let totalTimer = hr * 3600000 + min * 60000 + sec * 1000;

  let remainingTime = 0; // Сколько секунд осталось дотикать

  let start = document.querySelector("#start");
  let stop = document.querySelector("#restart");

  start.addEventListener("click", function () {
    if (remainingTime == 0) {
      remainingTime = hr * 3600000 + min * 60000 + sec * 1000 ;
    } else {
      // Do nothing
    }
    // const hours = hr * 3600000;
    // const minutes = min * 60000;
    // const seconds = sec * 1000;
    // setTime = hours + minutes + seconds;
    // const startTime = Date.now();
    // futureTime = startTime + setTime;
    console.log(remainingTime);
    timer.style.color = "black";
    timerLoop = setInterval(countDownTimer, 1000);
  });

  
  stop.addEventListener("click", function () {
    clearInterval(timerLoop);
  });
  

  function countDownTimer() {

    // const currentTime = Date.now();
    // const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / totalTimer) * 360;

    if (angle > 180) {
      semicircles[2].style.display = "none";
      semicircles[0].style.transform = "rotate(180deg)";
      semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
      semicircles[2].style.display = "block";
      semicircles[0].style.transform = `rotate(${angle}deg)`;
      semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    const hrs = Math.floor(
      (remainingTime / (1000 * 60 * 60)) % 24
    ).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString(
      "en-US",
      { minimumIntegerDigits: 2, useGrouping: false }
    );
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );

    timer.innerHTML = `
      <div>${hrs}</div>
      <div class="colon">:</div>
      <div>${mins}</div>
      <div class="colon">:</div>
      <div>${secs}</div>
      `;
    
      

    if (remainingTime <= 5000) {
      semicircles[0].style.backgroundColor = "red";
      semicircles[1].style.backgroundColor = "red";
      timer.style.color = "red";
    }

    remainingTime -= 1000;


    if (remainingTime < 0) {
      remainingTime = 0;
      clearInterval(timerLoop);
      semicircles[0].style.display = "none";
      semicircles[1].style.transform = "none";
      semicircles[2].style.transform = "none";

      timer.innerHTML = `
      <div>00</div>
      <div class="colon">:</div>
      <div>00</div>
      <div class="colon">:</div>
      <div>00</div>
      `;
      timer.style.color = "lightgray";
    }
    
  }

  
});

