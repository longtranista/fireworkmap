import {map, each} from 'lodash'
import moment from 'moment'
import data from './data'
import * as d3 from 'd3'

// var placesJson = '[{"time_start": "19:05", "info_url": "http://hanabi.walkerplus.com/detail/ar0313e00858/", "ask_phone": "03-5246-1111\u3000\u9685\u7530\u5ddd\u82b1\u706b\u5927\u4f1a\u5b9f\u884c\u59d4\u54e1\u4f1a\u4e8b\u52d9\u5c40", "latlng": ["35.689487", "139.80429064418"], "paid_seat": "\u5e02\u6c11\u5354\u8cdb\uff1a\u58a8\u7530\u533a\u5074\u4e21\u56fd\u89aa\u6c34\u30c6\u30e9\u30b9 1\u53e36000\u5186\uff081\u53e3\u30671\u540d\u62db\u5f85\u30011850\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u30011550\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u5c11\u5e74\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u3001500\u53e3\u7a0b\u5ea6\uff09\u307b\u304b", "time_end": "20:30", "location": "\u5c0f\u96e8\u6c7a\u884c(\u8352\u5929\u6642\u306f\u4e2d\u6b62)", "date_raw": "2016\u5e747\u670830\u65e5\uff08\u571f\uff09 19:05\uff5e20:30", "date": "2016/7/30", "homepage": "http://sumidagawa-hanabi.com/"},{"time_start": "19:05", "info_url": "http://hanabi.walkerplus.com/detail/ar0313e00858/", "ask_phone": "03-5246-1111\u3000\u9685\u7530\u5ddd\u82b1\u706b\u5927\u4f1a\u5b9f\u884c\u59d4\u54e1\u4f1a\u4e8b\u52d9\u5c40", "latlng": ["35.700623", "139.727125"], "paid_seat": "\u5e02\u6c11\u5354\u8cdb\uff1a\u58a8\u7530\u533a\u5074\u4e21\u56fd\u89aa\u6c34\u30c6\u30e9\u30b9 1\u53e36000\u5186\uff081\u53e3\u30671\u540d\u62db\u5f85\u30011850\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u30011550\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u5c11\u5e74\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u3001500\u53e3\u7a0b\u5ea6\uff09\u307b\u304b", "time_end": "20:30", "location": "\u5c0f\u96e8\u6c7a\u884c(\u8352\u5929\u6642\u306f\u4e2d\u6b62)", "date_raw": "2016\u5e747\u670830\u65e5\uff08\u571f\uff09 19:05\uff5e20:30", "date": "2016/7/30", "homepage": "http://sumidagawa-hanabi.com/"},{"time_start": "19:05", "info_url": "http://hanabi.walkerplus.com/detail/ar0313e00858/", "ask_phone": "03-5246-1111\u3000\u9685\u7530\u5ddd\u82b1\u706b\u5927\u4f1a\u5b9f\u884c\u59d4\u54e1\u4f1a\u4e8b\u52d9\u5c40", "latlng": ["35.693374", "139.766436"], "paid_seat": "\u5e02\u6c11\u5354\u8cdb\uff1a\u58a8\u7530\u533a\u5074\u4e21\u56fd\u89aa\u6c34\u30c6\u30e9\u30b9 1\u53e36000\u5186\uff081\u53e3\u30671\u540d\u62db\u5f85\u30011850\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u30011550\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u5c11\u5e74\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u3001500\u53e3\u7a0b\u5ea6\uff09\u307b\u304b", "time_end": "20:30", "location": "\u5c0f\u96e8\u6c7a\u884c(\u8352\u5929\u6642\u306f\u4e2d\u6b62)", "date_raw": "2016\u5e747\u670830\u65e5\uff08\u571f\uff09 19:05\uff5e20:30", "date": "2016/7/30", "homepage": "http://sumidagawa-hanabi.com/"},{"time_start": "19:05", "info_url": "http://hanabi.walkerplus.com/detail/ar0313e00858/", "ask_phone": "03-5246-1111\u3000\u9685\u7530\u5ddd\u82b1\u706b\u5927\u4f1a\u5b9f\u884c\u59d4\u54e1\u4f1a\u4e8b\u52d9\u5c40", "latlng": ["35.665067", "139.750814"], "paid_seat": "\u5e02\u6c11\u5354\u8cdb\uff1a\u58a8\u7530\u533a\u5074\u4e21\u56fd\u89aa\u6c34\u30c6\u30e9\u30b9 1\u53e36000\u5186\uff081\u53e3\u30671\u540d\u62db\u5f85\u30011850\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u30011550\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u5c11\u5e74\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u3001500\u53e3\u7a0b\u5ea6\uff09\u307b\u304b", "time_end": "20:30", "location": "\u5c0f\u96e8\u6c7a\u884c(\u8352\u5929\u6642\u306f\u4e2d\u6b62)", "date_raw": "2016\u5e747\u670830\u65e5\uff08\u571f\uff09 19:05\uff5e20:30", "date": "2016/7/30", "homepage": "http://sumidagawa-hanabi.com/"},{"time_start": "19:05", "info_url": "http://hanabi.walkerplus.com/detail/ar0313e00858/", "ask_phone": "03-5246-1111\u3000\u9685\u7530\u5ddd\u82b1\u706b\u5927\u4f1a\u5b9f\u884c\u59d4\u54e1\u4f1a\u4e8b\u52d9\u5c40", "latlng": ["35.663673", "139.730215"], "paid_seat": "\u5e02\u6c11\u5354\u8cdb\uff1a\u58a8\u7530\u533a\u5074\u4e21\u56fd\u89aa\u6c34\u30c6\u30e9\u30b9 1\u53e36000\u5186\uff081\u53e3\u30671\u540d\u62db\u5f85\u30011850\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u30011550\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u5c11\u5e74\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u3001500\u53e3\u7a0b\u5ea6\uff09\u307b\u304b", "time_end": "20:30", "location": "\u5c0f\u96e8\u6c7a\u884c(\u8352\u5929\u6642\u306f\u4e2d\u6b62)", "date_raw": "2016\u5e747\u670830\u65e5\uff08\u571f\uff09 19:05\uff5e20:30", "date": "2016/7/30", "homepage": "http://sumidagawa-hanabi.com/"},{"time_start": "19:05", "info_url": "http://hanabi.walkerplus.com/detail/ar0313e00858/", "ask_phone": "03-5246-1111\u3000\u9685\u7530\u5ddd\u82b1\u706b\u5927\u4f1a\u5b9f\u884c\u59d4\u54e1\u4f1a\u4e8b\u52d9\u5c40", "latlng": ["35.670646", "139.778967"], "paid_seat": "\u5e02\u6c11\u5354\u8cdb\uff1a\u58a8\u7530\u533a\u5074\u4e21\u56fd\u89aa\u6c34\u30c6\u30e9\u30b9 1\u53e36000\u5186\uff081\u53e3\u30671\u540d\u62db\u5f85\u30011850\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u30011550\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u5c11\u5e74\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u3001500\u53e3\u7a0b\u5ea6\uff09\u307b\u304b", "time_end": "20:30", "location": "\u5c0f\u96e8\u6c7a\u884c(\u8352\u5929\u6642\u306f\u4e2d\u6b62)", "date_raw": "2016\u5e747\u670830\u65e5\uff08\u571f\uff09 19:05\uff5e20:30", "date": "2016/7/30", "homepage": "http://sumidagawa-hanabi.com/"},{"time_start": "19:05", "info_url": "http://hanabi.walkerplus.com/detail/ar0313e00858/", "ask_phone": "03-5246-1111\u3000\u9685\u7530\u5ddd\u82b1\u706b\u5927\u4f1a\u5b9f\u884c\u59d4\u54e1\u4f1a\u4e8b\u52d9\u5c40", "latlng": ["35.689331", "139.721804"], "paid_seat": "\u5e02\u6c11\u5354\u8cdb\uff1a\u58a8\u7530\u533a\u5074\u4e21\u56fd\u89aa\u6c34\u30c6\u30e9\u30b9 1\u53e36000\u5186\uff081\u53e3\u30671\u540d\u62db\u5f85\u30011850\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u30011550\u53e3\u7a0b\u5ea6\uff09\u3001\u53f0\u6771\u30ea\u30d0\u30fc\u30b5\u30a4\u30c9\u30b9\u30dd\u30fc\u30c4\u30bb\u30f3\u30bf\u30fc\u5c11\u5e74\u91ce\u7403\u58341\u53e37500\u5186\uff081\u53e3\u30675\u540d\u4ee5\u5185\u3092\u62db\u5f85\u3001500\u53e3\u7a0b\u5ea6\uff09\u307b\u304b", "time_end": "20:30", "location": "\u5c0f\u96e8\u6c7a\u884c(\u8352\u5929\u6642\u306f\u4e2d\u6b62)", "date_raw": "2016\u5e747\u670830\u65e5\uff08\u571f\uff09 19:05\uff5e20:30", "date": "2016/7/30", "homepage": "http://sumidagawa-hanabi.com/"}]'

export default {
  state: {
    markers: []
  },

  generateIconCache: {},

  init (callback) {
    this.state.markers = map(data.data, function (o) {
      return {
        position: {
          lat: parseFloat(o.latlng[0]),
          lng: parseFloat(o.latlng[1])
        },
        ifw: false,
        ifw2text: o.date,
        info: {
          date: o.date,
          from_now: moment(o.date, 'YYYY/M/D').fromNow(),
          time_start: o.time_start,
          time_end: o.time_end,
          location: o.location
        }
      }
    })

    var me = this
    var count = 0
    each(this.state.markers, function (item) {
      me.generateIcon(1, function (src) {
        item.icon = {
          url: src
        }
        if (++count >= me.state.markers.length) {
          callback()
        }
      })
    })
  },

  generateIcon: function (number, callback) {
    if (this.generateIconCache[number] !== undefined) {
      callback(this.generateIconCache[number])
    }

    var fontSize = 16
    var imageWidth = 35
    var imageHeight = 35

    if (number >= 1000) {
      fontSize = 10
      imageWidth = imageHeight = 55
    } else if (number < 1000 && number > 100) {
      fontSize = 14
      imageWidth = imageHeight = 45
    }

    var svg = d3.select(document.createElement('div')).append('svg')
      .attr('viewBox', '0 0 54.4 54.4')
      .append('g')

    var circles = svg.append('circle')
    circles.attr('cx', '27.2')
      .attr('cy', '27.2')
      .attr('r', '21.2')
      .style('fill', '#2063C6')

    var path = svg.append('path')
    path.attr('d', 'M27.2,0C12.2,0,0,12.2,0,27.2s12.2,27.2,27.2,27.2s27.2-12.2,27.2-27.2S42.2,0,27.2,0z M6,27.2 C6,15.5,15.5,6,27.2,6s21.2,9.5,21.2,21.2c0,11.7-9.5,21.2-21.2,21.2S6,38.9,6,27.2z')
      .attr('fill', '#FFFFFF')

    var text = svg.append('text')
    text.attr('dx', 27)
      .attr('dy', 32)
      .attr('text-anchor', 'middle')
      .attr('style', 'font-size:' + fontSize + 'px fill: #FFFFFF font-family: Arial, Verdana font-weight: bold')
      .attr('fill', '#FFFFFF')
      .text(number)

    var svgNode = svg.node().parentNode.cloneNode(true)
    var image = new window.Image()

    d3.select(svgNode).select('clippath').remove()

    var xmlSource = (new window.XMLSerializer()).serializeToString(svgNode)

    var me = this
    image.onload = function (imageWidth, imageHeight) {
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')
      var dataURL

      d3.select(canvas)
        .attr('width', imageWidth)
        .attr('height', imageHeight)

      context.drawImage(image, 0, 0, imageWidth, imageHeight)

      dataURL = canvas.toDataURL()
      me.generateIconCache[number] = dataURL
      callback(dataURL)
    }.bind(this, imageWidth, imageHeight)
    // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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'
    image.src = 'data:image/svg+xml;base64,' + window.btoa(encodeURIComponent(xmlSource).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1)
    }))
  }
}
