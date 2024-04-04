function visualizeArray(array) {
    const container = document.getElementById('visualization');
    container.innerHTML = ''; // refreshed dashboard 
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.style.height = `${value}px`; // for aesthetic purposes
        bar.classList.add('bar');
        container.appendChild(bar);
    });
}

async function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start >= end) {
        return;
    }

    let index = await partition(arr, start, end);
    visualizeArray(arr); // this updates each partition

    await quickSort(arr, start, index - 1);
    await quickSort(arr, index + 1, end);
}

async function partition(arr, start, end) {
    let pivot = arr[end];
    let i = start;

    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }

    [arr[i], arr[end]] = [arr[end], arr[i]];
    await new Promise((resolve) => setTimeout(resolve, 100)); // change int value to introduce delay
    return i;
}

async function sortArrayAndMeasureTime(array, elementId) {
    const startTime = performance.now();
    await quickSort(array);
    const endTime = performance.now();
    displayTime(array.length, (endTime - startTime).toFixed(2), elementId);
}

function displayTime(arraySize, time, elementId) {
    document.getElementById(elementId).textContent = `Time to sort an array of size ${arraySize}: ${time} milliseconds.`;
}

function displayComplexity() {
    document.getElementById('complexity').textContent = "Average Time Complexity of Quick Sort: O(n log n)";
}

function makeArray(number) {
    let array = [];
    for (let i = 0; i < number; ++i) {
        array[i] = i;
    }

    let tmp, current, top = array.length;
    if (top) {
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    }
    return array;
}

// buttons 
document.getElementById('visualize50').addEventListener('click', () => {
    const array = makeArray(50);
    visualizeArray(array);
    sortArrayAndMeasureTime(array, 'smallArrayTime').then(() => displayComplexity());
});

document.getElementById('visualize1000').addEventListener('click', () => {
    const array = makeArray(1000);
    visualizeArray(array);
    sortArrayAndMeasureTime(array, 'mediumArrayTime').then(() => displayComplexity());
});

document.getElementById('visualize10000').addEventListener('click', () => {
    const array = makeArray(10000);
    visualizeArray(array);
    sortArrayAndMeasureTime(array, 'largeArrayTime').then(() => displayComplexity());
});
