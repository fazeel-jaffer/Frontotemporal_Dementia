const iterations = 5; // To be decided
const clickTime  = 5; // Given 5  sec
const restTime   = 5; // Given 10 sec

const box1    = document.getElementById('box1');
const box2    = document.getElementById('box2');
const timer   = document.getElementById('timer');
const result  = document.getElementById('result');
const grid    = document.getElementById('grid');

document.getElementById('proceed').addEventListener('click', function () {
  box1.style.display = 'flex';
  box2.style.display = 'flex';
  Game();
  document.getElementById('prompt').style.display = 'none';
});

function Game() {
  let clickedBlue = false;
  let clickedRed  = false;
  let totalClicks = 0;
  let boolIndex   = 0;
  const clickResults = new Array(iterations).fill(0);

  document.addEventListener('click', function (event) {
    totalClicks++;
    if(event.target.style.backgroundColor === 'blue') {
      clickedBlue = true;
      clickedRed  = false;
    }
    else if(event.target.style.backgroundColor === 'red') {
      clickedRed  = true;
      clickedBlue = false;
    }
  });

  function rep() {
    let countDown = clickTime;
    if(Math.random() < 0.5) {
      box2.style.backgroundColor = 'red';
      box1.style.backgroundColor = 'blue';
      const blueButton = box1;
    } else {
      box1.style.backgroundColor = 'red';
      box2.style.backgroundColor = 'blue';
      const blueButton = box2;
    }
    timer.textContent = countDown;
    const interval = setInterval(() => {
      countDown--;
      timer.textContent = countDown;
      if(countDown === 0) {
        clearInterval(interval);
        box1.style.backgroundColor = 'gray';
        box2.style.backgroundColor = 'gray';
        timer.textContent = 'STOP!';
      }
    }, 1000);

    // try crypto.getRandomValues(new Uint32Array(1))[0] % 2
    // use try ... catch
    setTimeout(() => {
      clearInterval(interval);
      if(Math.random() < 0.5) {
        box2.style.backgroundColor = 'red';
        box1.style.backgroundColor = 'blue';
      } else {
        box1.style.backgroundColor = 'red';
        box2.style.backgroundColor = 'blue';
      }
      timer.textContent = '';
    }, (clickTime+restTime)*1000);
  }

  rep();
  const repInterval = setInterval(rep, (clickTime+restTime)*1000);

  const clickInterval = setInterval(function() {
    if(clickedBlue) {
      clickResults[boolIndex] = 1;
    } 
    boolIndex++;
    clickedBlue = false;
  }, (clickTime+restTime)*1000);

  setTimeout(() => {
    clearInterval(repInterval);
  }, (iterations-1)*(clickTime+restTime)*1000);

  setTimeout(() => {
    clearInterval(clickInterval);
    // clear screen of game elements
    box1.style.display  = 'none';
    box2.style.display  = 'none';
    timer.style.display = 'none';
    let guide = document.getElementById('guide');
    guide.style.display = 'none';
    guide.style.height  = '0vh';
    document.getElementById('timer-box').style.display = 'none';
    document.getElementById('timer-box').style.height  = '0vh';
    grid.style.height   = '0vh';
    // display results
    result.style.display = 'flex';
    let router = document.getElementById('container');
    router.style.display = 'flex';
    const resultTable = `
      <table>
        <tr>
          <th>Result</th>
          <th></th>
        </tr>
        <tr>
          <td>Total Clicks</td>
          <td>${totalClicks-1}</td>
        </tr>
        <tr>
          <td>Correct Clicks</td>
          <td>${clickResults.reduce((a, b) => a + b, 0)}</td>
        </tr>
        <tr>
          <td>Iterations</td>
          <td>${iterations}</td>
        </tr>
      </table>
      `;
    result.innerHTML = resultTable;
  }, (iterations)*(clickTime+restTime)*1000);
}
