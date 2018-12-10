const R = require('ramda');
const d3 = require('d3');
const math = require("mathjs");
import './style.css';
import Data from './assiduite-des-elus.csv'

function prepareData() {
    let todraw = [];
    Data.forEach(line => {
        let found = false;
        const name = `${line["Prénom"]} ${line["Nom"]}`
        // const name = `${line["Prénom"]} ${line["Nom"]} (${line["Groupe"]})`
        const absence = line["% absences non justifiées"]
        todraw.forEach(elu => {
            if (elu.name == name) {
                found = true;
                elu.absences = [].concat(elu.absences, absence);
            }
        })
        if (!found) {
            todraw = [].concat(todraw, {
                name: name,
                absences: [absence]
            })
        }
    });

    todraw.sort(function (a, b) {
        if (math.mean(a.absences) > math.mean(b.absences)) {
            return -1;
        }
        else if (math.mean(a.absences) < math.mean(b.absences)) {
            return 1;
        }
        else if (math.mean(a.absences) == math.mean(b.absences)) {
            return 0;
        }
    })
    return todraw;
}

function drawChart() {
    let todraw = prepareData();
    todraw = todraw.slice(0, 20);

    const margin = 60;
    const width = 1024;
    const height = 640;

    const svg = d3.select('svg')
        .attr("width", width + 2 * margin)
        .attr("height", height + 4 * margin)
        .attr("class", "bar-chart");

    svg.append('text')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Tx Absentéisme (%)')

    svg.append('text')
        .attr('x', (width / 2) )
        .attr('y', height + (3.5 * margin) )
        .attr('text-anchor', 'middle')
        .text('Top 20')

    svg.append('text')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Absentéisme des élus en Ile-de-France')


    const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);


    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 25]);
    chart.append('g')
        .call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(todraw.map((s) => s.name))
        .padding(0.2)
    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    chart.selectAll()
        .data(todraw)
        .enter()
        .append('rect')
        .attr('x', (s) => xScale(s.name))
        .attr('y', (s) => yScale(math.mean(s.absences)))
        .attr('height', (s) => height - yScale(math.mean(s.absences)))
        .attr('width', xScale.bandwidth())

    chart.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom()
            .scale(xScale)
            .tickSize(-height, 0, 0)
            .tickFormat(''))

    chart.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft()
            .scale(yScale)
            .tickSize(-width, 0, 0)
            .tickFormat(''))
}

drawChart();
