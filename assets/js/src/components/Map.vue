<template>

  <div id="map-wrapper">
    <div id="map">
        <map
          v-ref:mymap
          :center.sync="center"
          :zoom.sync="zoom"
          :bounds.sync="mapBounds"
          @g-idle="mapIdle"
        >
        
      <!--     <cluster
          :grid-size="gridSize"
          :styles="clusterStyles"
          > -->
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
                  <div class="date">
                    {{m.info.date}} 
                    (<span class="day">{{m.info.day}}</span>)

                     <span class="countdown">
                      (in <span class="fromnow">{{m.info.from_now}}</span> days)
                    </span>
                  </div>
                 
                  <div class="time">{{m.info.time_start}} ~ {{m.info.time_end}}</div>
                  <div class="location">{{m.info.location}}</div>
                  <div class="homepage"><a target="_blank" href="{{m.info_url}}">detail url</a></div>
                </div>
              </info-window>
            </marker>
          <!-- </cluster> -->
          
          <cluster
          :grid-size="gridSize"
          :styles="clusterStyles"
          > 
            <marker
              :position.sync="m.position"
              v-for="m in shops"
              >
                <info-window
                :opened.sync="m.ifw"
                :content="m.name"
                >
                  <div class="myInfoWindow">
                    {{ m.name }}
                  </div>
                    }
                </info-window>
              </marker>
          </cluster>


        </map>

        <div v-show="showLoad" class="loader">
          <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
        </div>
      </div>
  </div>
  <div id="header">
    <div id="wrapper">
          
          <span class="branding">JAPAN FIREWORK 2016</span>

          <div class="place-input">
             <place-input
              :select-first-on-enter="true"
              text="Tokyo"
              @g-place_changed="changeLocation"
            ></place-input>

            <span @click="getCurrentLocation" class="current"><img src="../assets/current.png"></span>
            
          </div>
    </div>

    <div id="controlbar">
      <div id="content">
        Something crazy here
      </div>
    </div>
  </div>
  <div v-show="showNotify" id="notify">
    <div class="content">
      Zoom in to see markers!
    </div>
  </div>
  <div id="footer">
    <span>@By LongTran</span>

    <a href="https://github.com/phocode/fireworkmap">Github</a>

  </div>
</template>

<script>
  import {load, Map, Marker, Cluster, InfoWindow, PlaceInput} from 'vue-google-maps'
  import shared from '../services/place'
  import {map} from 'lodash'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

  load('AIzaSyAz-kAgMOocefWOYiGjGyNRzsMJHZkzPyI', '3', ['places'])

  export default {
    components: {
      Map,
      Marker,
      Cluster,
      InfoWindow,
      PlaceInput,
      PulseLoader
    },
    data () {
      return {
        showMaxLevel: 8,
        zoom: 10,
        mapBounds: {},
        gridSize: 20,
        showNotify: false,
        showLoad: true,
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
        shops: [],
        center: {lat: 35.689487, lng: 139.691706}
      }
    },

    watch: {
      'zoom': function (val) {
        if (val <= this.showMaxLevel) {
          this.showNotify = true
          this.$set('markers', [])
        } else {
          this.showNotify = false
        }
      }
    },

    init () {
    },

    ready () {
      document.getElementsByTagName('input')[0].value = 'Tokyo'
      shared.init()
    },

    methods: {
      clickMarker: function (marker) {
        map(this.markers, function (o) {
          o.ifw = o === marker
        })
      },

      /**
       * Load Markers when map is idles
       * @return {[type]} [description]
       */
      mapIdle: function () {
        (this.zoom > this.showMaxLevel) && this.loadMarkers()
      },

      loadMarkers: function () {
        var me = this
        me.showLoad = true
        shared.getMarkersInBounds(this.mapBounds, function () {
          // me.markers = shared.state.markers
          me.showLoad = false
        })

        shared.getShops(this.mapBounds, function () {
          console.log('finished')
          me.shops = shared.state.shops
        })
      },

      changeLocation: function (event) {
        var me = this
        var address = document.getElementsByTagName('input')[0].value
        shared.getLatLngFromAddr(address, function (latlng) {
          me.center = latlng.toJSON()
        })
      },

      getCurrentLocation: function () {
        var me = this
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            me.center.lat = position.coords.latitude
            me.center.lng = position.coords.longitude
            me.zoom = 12
          })
        } else {
          window.alert('Geolocation is not supported by this browser.')
        }
      }
    }
  }
</script>

<style lang="scss">
$headerHeight: 100px;
$maxWidth: 600px;


#map-wrapper{
  position: fixed;
  top: $headerHeight;
  left: 0;
  right: 0;
  bottom: 0;

    div#map {
      margin: 0 auto;
      // max-width: $maxWidth;
      /*width:100%;*/
      height: 100%;
      display: block;
      background: #c0c0c0;

      .myInfoWindow{
        background: #fff;

        .date{
          font-size: 110%;
          font-weight: bold;
        }
        .fromnow{
          color: red;
          font-weight: bold;
        }
      }
    }

    .loader{
      position: absolute;
      top: 45%;
      left: 47%;
      z-index: 999999999;
    }
}

#header {
  background: #f7f7f7;
  height: $headerHeight;

  #wrapper{
    max-width: $maxWidth;
    margin: 0 auto;
    padding: 10px;
    .branding{
      display: block;
      color: #27ab46;
      font-size: 120%;
    }

    .place-input{
      margin-top: 6px;
        top: 30px;
        left: 10%;
        input{
          font-size: 110%;
          min-width: 70%;
        }

        .current{
          border: 1px solid #c0c0c0;
          background: #fff;
          height: 23px;
          padding: 2px;
          display: inline-block;
          border-radius: 3px;
          vertical-align: center;
          cursor: pointer;

          img{
            width: 21px;
            vertical-align: middle;
            margin-bottom: 5px;
            display: inline;
          }
        }
        .current:hover{
          background: #f0f0f0;
        }
        
      }
  }
}

#notify{
  margin-top: -25px;
  background: #ffcbcb;
  .content{
    padding: 3px 0;
    margin: 0 auto;
    max-width: $maxWidth;
    text-align: center;
  }
}

#footer{
  position: fixed;
  top: 4px;
  right: 10px;
  font-size: 13px;
  color: #ccc;
}

</style>