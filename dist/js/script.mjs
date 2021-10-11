const radio = document.querySelector('.time-frame-menu')
const timers = document.querySelectorAll(".card-timer")


// Replace this function with anything that will return the same data structure - could be an api (YAGNI)
async function getData() {
    const headers = new Headers()
    headers.append('Accept', 'application/json')
    const file = await fetch('data/data.json', {headers})
    return file.json()

}

function setTimerData(timerEl, data, timeFrame) {
    const currentTimer = timerEl.querySelector('.current-timer')
    const previousTimer = timerEl.querySelector('.previous-timer')
    const dataItem = data.filter(d => d.title.toLowerCase() === timerEl.dataset.name)[0]
    const current = dataItem.timeframes[timeFrame.toString()].current
    const previous = dataItem.timeframes[timeFrame.toString()].previous
    // Could have used a nested str
    const previousPrefix = {
        daily: 'Yesterday',
        weekly: 'Last Week',
        monthly: 'Last Month'
    }

    currentTimer.innerText = current + 'hrs'
    previousTimer.innerText = `${previousPrefix[timeFrame]} ${previous} hrs`

}

async function setTimerCards(timeFrame) {
    try {
    const tf = timeFrame || radio.querySelector('input[checked]').value
    const d = await getData()
    timers.forEach((e)=> {
        setTimerData(e, d, tf)
    })
    } catch(e) {
        console.log(e)
    }
}

(async function init() {
    await setTimerCards()
    radio.reset()

})()

radio.addEventListener('input', async (e) => {{
    e.preventDefault()
    await setTimerCards(e.target.value)
}})


















