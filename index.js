const d6 = () => {
    return Math.floor(Math.random() * 6);
}

const display = (statistics) => {
    const elements = [...document.querySelectorAll('.result')];
    const max = Math.max(...statistics.filter((v) => v !== undefined));
    elements.forEach((el, index) => { 
        value = statistics[index];
        el.style.height = `${(value || 0) * 100 / max}%`;
        el.setAttribute('data-value', value || '');
        el.setAttribute('data-index', index);
    });    
}

const generate = (number, func) => {
    const statistics = [];
    for (let i = 0; i < number; i++) {
        const v = func();
        statistics[v] = statistics[v] || 0;
        statistics[v] += 1;
    }
    return statistics;
}

// const bit = () => d6() < 3 ? 0 : 1;
// const bit2 = () => d6() < 2 ? 0 : d6() < 4 ? 1 : 2;

const generators = {
    d6: () => {
        return d6();
    },
    '2d6': () => {
        return d6() + d6();
    },
    '3d6': () => {
        return d6() + d6() + d6();
    },
    rnd0: () => {
        return Math.floor(Math.random() * 10);
    },
    rnd1: () => {
        const val = d6() + d6() + d6() + d6() + d6() + d6();
        return val % 10;
    },
    rnd2: () => {
        const val = d6() + d6() + d6() + d6() + d6() + d6();
        return (val + d6() + d6() - d6() - d6()) % 10;
    },
    // rnd2444: () => {
    //     const bits = [bit(), bit2(), bit()].join('');
    //     return 
    // },
    // rnd2: () => {
    //     return (d6() * 11 + d6()) % 10;
    // },
    rnd3: () => {
        const randomNumber = parseInt([d6(), d6(), d6(), d6()].join(''), 6);
        const max6DigitNumber = parseInt('5555', 6);
        return Math.floor(randomNumber / max6DigitNumber * 9.9999);
    },
};


const button = document.querySelector('#runButton');
const input = document.querySelector('#number');
const radio = document.querySelector('input[name=func][checked]');
const form = document.querySelector('form');

let func = radio.value;
document.addEventListener('change', (event) => {
    if (event.target.name === 'func') {
        func = event.target.value;
        run();
    }
});
 
const run = () => {
    const statistics = generate(parseInt(input.value, 10), generators[func]);
    display(statistics);
}

input.addEventListener('change', run);
input.addEventListener('blur', run);
button.addEventListener('click', run);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    run();
});

setTimeout(run, 0);