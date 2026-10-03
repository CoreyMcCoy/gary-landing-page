// Missed-call calculator: how many of the visitor's own missed calls Gary has to book to cover its price.
// Uses only the visitor's two numbers and the monthly price, with no industry averages.

const WEEKS_PER_MONTH = 52 / 12;

const calculator = document.querySelector('.job-value');

if (calculator) {
  const monthlyPrice = Number(calculator.dataset.monthlyPrice);
  const jobValueInput = document.getElementById('job-value-input');
  const jobValueOutput = document.getElementById('job-value-output');
  const missedCallsInput = document.getElementById('missed-calls-input');
  const missedCallsOutput = document.getElementById('missed-calls-output');
  const jobsNeeded = document.getElementById('jobs-needed');
  const missedPerMonth = document.getElementById('missed-per-month');

  function updateResult() {
    const jobValue = Number(jobValueInput.value);
    const missedPerWeek = Number(missedCallsInput.value);
    const formattedJobValue = '$' + jobValue.toLocaleString('en-US');

    jobValueOutput.textContent = formattedJobValue;
    jobValueInput.setAttribute('aria-valuetext', formattedJobValue);
    missedCallsOutput.textContent = missedPerWeek;

    jobsNeeded.textContent = Math.ceil(monthlyPrice / jobValue);
    missedPerMonth.textContent = Math.round(missedPerWeek * WEEKS_PER_MONTH);
  }

  jobValueInput.addEventListener('input', updateResult);
  missedCallsInput.addEventListener('input', updateResult);
  updateResult();
}
