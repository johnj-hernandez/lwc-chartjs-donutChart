import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartjs';

export default class ChartComponent extends LightningElement {

    @api values = [30, 50, 20, 10, 10, 10, 10, 10];
    @api labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8'];
    @api title = 'Custom Title Example';

    get config() {
        return {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: this.values,
                        backgroundColor: [
                            "#00A1E0", // Salesforce Blue
                            "#007BB8", // Dark Blue 1
                            "#005587", // Dark Blue 2
                            "#00345E", // Dark Blue 3
                            "#002649", // Dark Blue 4
                            "#0099E6", // Light Blue 1
                            "#66CCFF", // Light Blue 2
                            "#99D6E6", // Light Blue 3
                            "#BFE6FF", // Light Blue 4
                            "#005CB8", // Accent Blue 1
                            "#0080FF", // Accent Blue 2
                            "#3399FF", // Accent Blue 3
                            "#66B2FF", // Accent Blue 4
                            "#99CCFF", // Accent Blue 5
                            "#CCE5FF",  // Accent Blue 6
                            "#007BB8", // Dark Blue 1 //some other values just in case
                            "#005587", // Dark Blue 2
                            "#00345E", // Dark Blue 3
                            "#002649", // Dark Blue 4
                            "#0099E6", // Light Blue 1
                            "#66CCFF", // Light Blue 2
                            "#99D6E6", // Light Blue 3
                            "#F7464A",
                            "#46BFBD",
                            "#FDB45C",
                            "#949FB1",
                            "#4D5360",
                        ],
                        label: ''
                    }
                ],
                labels: this.labels
            },
            options: {
                responsive: true,
                legend: { position: 'right' },
                animation: { animateScale: true, animateRotate: true },
                title: {
                    display: this.title ? true : false,
                    text: this.title
                },
            }
        };
    }

    // Initialize the chart
    renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;

        loadScript(this, chartjs).then(() => {
            const canvas = this.template.querySelector('canvas.doughnut-chart').getContext('2d');

            this.chart = new Chart(canvas, this.config);
        }).catch(error => {
            console.log('Error loading Chart.js');
            console.error(error);
        });


    }

}