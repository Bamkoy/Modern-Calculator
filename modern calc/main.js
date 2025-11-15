 let currentMode = 'basic';
    let history = '';

    function appendToDisplay(value) {
      const display = document.getElementById('display');
      if (display.value === '0' || display.value === 'Error') {
        display.value = value;
      } else {
        display.value += value;
      }
    }

    function calculateResult() {
      const display = document.getElementById('display');
      const historyDisplay = document.getElementById('history');
      
      try {
        const expression = display.value;
        const result = eval(expression);
        
        if (!isFinite(result)) {
          throw new Error('Invalid calculation');
        }
        
        historyDisplay.textContent = expression + ' =';
        display.value = Math.round(result * 100000000) / 100000000;
        history = display.value;
      } catch (error) {
        display.value = 'Error';
        display.parentElement.parentElement.classList.add('error-animation');
        setTimeout(() => {
          display.parentElement.parentElement.classList.remove('error-animation');
        }, 300);
      }
    }

    function clearDisplay() {
      document.getElementById('display').value = '0';
      document.getElementById('history').textContent = '';
    }

    function deleteLast() {
      const display = document.getElementById('display');
      if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
      } else {
        display.value = '0';
      }
    }

    function toggleSign() {
      const display = document.getElementById('display');
      if (display.value !== '0' && display.value !== 'Error') {
        if (display.value.startsWith('-')) {
          display.value = display.value.substring(1);
        } else {
          display.value = '-' + display.value;
        }
      }
    }

    function percentage() {
      const display = document.getElementById('display');
      try {
        const value = eval(display.value);
        display.value = value / 100;
      } catch (error) {
        display.value = 'Error';
      }
    }

    function factorial() {
      const display = document.getElementById('display');
      try {
        let num = parseInt(display.value);
        if (num < 0 || num > 170) {
          throw new Error('Out of range');
        }
        let result = 1;
        for (let i = 2; i <= num; i++) {
          result *= i;
        }
        display.value = result;
      } catch (error) {
        display.value = 'Error';
      }
    }

    function toggleMode(mode) {
      currentMode = mode;
      const buttons = document.querySelectorAll('.mode-btn');
      const scientificRows = document.querySelectorAll('.scientific-row');
      const buttonGrid = document.getElementById('buttonGrid');
      
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      if (mode === 'scientific') {
        scientificRows.forEach(row => row.classList.add('show'));
        buttonGrid.classList.add('scientific');
      } else {
        scientificRows.forEach(row => row.classList.remove('show'));
        buttonGrid.classList.remove('scientific');
      }
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      
      if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculateResult();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
      } else if (key === 'Backspace') {
        deleteLast();
      } else if (key === '(' || key === ')') {
        appendToDisplay(key);
      }
    });