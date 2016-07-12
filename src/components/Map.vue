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
      v-for="m in markers"
      >
        <info-window
        :opened.sync="m.ifw"
        :content="m.ifw2text"
        >
          <div class="myInfoWindow">
            <div class="date">{{m.info.date}}</div>
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
        markers: shared.state.markers,
        center: {lat: 35.689487, lng: 139.80429064418}
      }
    },
    init () {
      shared.init()
    }
  }
</script>

<style>
map {
  width:600px;
  height: 400px;
  display: block;
}

.myInfoWindow{
  background: #fff;
}
</style>