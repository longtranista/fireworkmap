<template>
  <map
    :center="center"
    :zoom="11"
  >
  
    <cluster
    :grid-size="gridSize"
    :styles="clusterStyles"
    >
      <marker
      :position.sync="m.position"
      :label="m.label"
      :icon.sync="m.icon"
      @g-click="clickMarker(m)"
      v-for="m in markers"
      >
        <info-window
        :opened.sync="m.ifw"
        :content="m.ifw2text"
        >
          <div class="myInfoWindow">
            <div class="date">{{m.info.date}} ({{m.info.from_now}})</div>
            <div class="time">{{m.info.time_start}} ~ {{m.info.time_end}}</div>
            <div class="location">{{m.info.location}}</div>
          </div>
        </info-window>
      </marker>
    </cluster>
  
  </map>
  <place-input
    label="Add a marker at this place"
    :select-first-on-enter="true"
  ></place-input>
</template>

<script>
  import {load, Map, Marker, Cluster, InfoWindow, PlaceInput} from 'vue-google-maps'
  import shared from '../services/place'
  import {map} from 'lodash'

  load('AIzaSyAz-kAgMOocefWOYiGjGyNRzsMJHZkzPyI', '1')

  export default {
    components: {
      Map,
      Marker,
      Cluster,
      InfoWindow,
      PlaceInput
    },
    data () {
      return {
        gridSize: 20,
        clusterStyles: [
          {
            textColor: 'red',
            textSize: 20,
            url: '/static/circle.svg',
            height: 50,
            width: 50
          },
          {
            textColor: 'red',
            textSize: 20,
            url: '/static/circle.svg',
            height: 50,
            width: 50
          },
          {
            textColor: 'red',
            textSize: 20,
            url: '/static/circle.svg',
            height: 50,
            width: 50
          }
        ],
        markers: [],
        center: {lat: 35.689487, lng: 139.80429064418}
      }
    },
    init () {
      var me = this
      shared.init(function () {
        me.$set('markers', shared.state.markers)
      })
    },
    methods: {
      clickMarker: function (marker) {
        map(this.markers, function (o) {
          o.ifw = o === marker
        })
      }
    }
  }
</script>

<style>
map {
  width:100%;
  height: 100%;
  display: block;
}

.myInfoWindow{
  background: #fff;
}
</style>