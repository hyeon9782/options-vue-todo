<template lang="">
  <div ref="chart"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import * as d3 from 'd3'
export default defineComponent({
  name: 'DonutChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const width = window.innerWidth < 500 ? window.innerWidth - 25 : 500

      const height = 250
      const margin = 0
      const radius = Math.min(width, height) / 3 - margin

      const svg = d3
        .select(this.$refs.chart)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 3 + ',' + height / 2 + ')')

      const color = d3
        .scaleOrdinal()
        .domain(this.data.map((d: any) => d.name))
        .range(d3.schemeDark2)

      const pie = d3.pie().value((d: any) => d.value)

      const data_ready = pie(this.data)

      const arcGenerator = d3.arc().innerRadius(70).outerRadius(radius)

      svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', (d: any) => color(d.data.name))
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)

      const legendCircleSize = 20
      const legendSpacing = 10

      // legend 색상이 도넛 차트 색상과 불일치
      const legend = svg
        .selectAll('.legend')
        .data(data_ready)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d: any, i: any) {
          const height = legendCircleSize + legendSpacing
          const offset = (height * color.domain().length) / 2
          const horz = 7 * legendCircleSize
          const vert = i * height - offset
          return 'translate(' + horz + ',' + vert + ')'
        })

      legend
        .append('circle')
        .attr('r', legendCircleSize / 2)
        .style('fill', color)
        .style('stroke', color)

      legend
        .append('text')
        .attr('x', legendCircleSize + legendSpacing)
        .attr('y', 0 + legendSpacing / 2)
        .text(function (d: any) {
          return `${d.data.name} ${d.data.value}개`
        })
    }
  }
})
</script>
