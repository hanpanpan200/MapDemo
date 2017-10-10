import React, { Component } from 'react'
import { View, Text, AppRegistry, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import Geojson from 'react-native-geojson'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  focusMyLocationButton: {
    position: 'absolute',
    top: 40,
    right: 0,
    zIndex: 100,
  },
  focusMarkersButton: {
    position: 'absolute',
    top: 80,
    right: 0,
    zIndex: 100,
  },
})

const multiline = {
  features: [
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90216779871662, 39.148406432505595], [-91.90217333858294, 39.14852721977089], [-91.90231616756796, 39.148608509263426]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90287541470984, 39.14843425653056], [-91.90284095150058, 39.14855117974758], [-91.9029340389998, 39.14865934397394]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90287541470984, 39.14843425653056], [-91.90269830053435, 39.148303012779394]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90287541470984, 39.14843425653056], [-91.90305624669767, 39.14832391396969]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90638105514978, 39.15180083906827], [-91.90624332862967, 39.15183698478074], [-91.90605938298684, 39.151694336945276]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90637077410273, 39.15230847141836], [-91.90639210333589, 39.152508547248104], [-91.90637882491542, 39.152653578061724], [-91.90635907125011, 39.15271858469254]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90556370023397, 39.15236552216463], [-91.90633507161004, 39.15236308623388], [-91.90637077410273, 39.15230847141836]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90537768807908, 39.151910162887255], [-91.90537539044226, 39.1523315003092], [-91.90630592710983, 39.152334337313974], [-91.90637077410273, 39.15230847141836]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90638105514978, 39.15180083906827], [-91.90641927517457, 39.151913908714846], [-91.90641765252069, 39.152267210248475], [-91.90654091546217, 39.152346259988576]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90638105514978, 39.15180083906827], [-91.90641910302763, 39.15197116820975], [-91.90641765252069, 39.152267210248475], [-91.90657819149632, 39.15215152348771]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90611177190539, 39.150051020365076], [-91.90639141819932, 39.14990317760698]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.901433243787, 39.14841092444247], [-91.90131445590467, 39.1482933118079]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90537775939093, 39.15166221753938], [-91.90554129688964, 39.151546179967504]]],
      }
    },
    {
      geometry: {
        type: 'MultiLineString',
        coordinates: [[[-91.90206476304394, 39.14917565473722], [-91.90221061565605, 39.14904804853197]]],
      }
    },
  ]
}
const point = {
  features: [
    {
      geometry: {
        type: 'Point',
        coordinates: [100.0, 0.0],
      }
    }
  ]
}

const polygon = {
  features: [
    {
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
              [
                  [180.0, 40.0], [180.0, 50.0], [170.0, 50.0],
                  [170.0, 40.0], [180.0, 40.0]
              ]
          ]
        ],
      }
    }
  ]
}

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 }

const INIT_POSITION = [{
  latitude: 39.150051020365076,
  longitude: -91.90611177190539,
}]

export default class MapDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMyLocation: false,
    }
  }

  focus = positions => {
    this.map.fitToCoordinates(positions, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    })
    // Note:
    // If showMyLocation is true, the map will focus to my location after call the method below
    this.map.fitToElements(true)
  }

  focusMarkers = () => {
    this.setState({ showMyLocation: false })
    this.focus(INIT_POSITION)
  }

  focusOnMe = () => {
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        this.setState({ showMyLocation: true })
        const pos = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        }
        // this.setState({ region: getRegionForCoordinates([pos]) })
        this.focus([pos])
      },
      (error) => alert('Error: Are location services on?'),
      {enableHighAccuracy: true}
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.focusMyLocationButton} onPress={this.focusOnMe}>Focus on me</Text>
        <Text style={styles.focusMarkersButton} onPress={this.focusMarkers}>Focus markers</Text>
        <MapView
          style={styles.map}
          ref={ref => { this.map = ref }}
          showsUserLocation={this.state.showMyLocation}
          showsScale
          onLayout={this.focusMarkers}
        >
          <Geojson geojson={multiline} strokeColor='red' strokeWidth={5} />
        </MapView>
      </View>
    )
  }
}

AppRegistry.registerComponent('MapDemo', () => MapDemo)
