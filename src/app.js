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

const points = {
  features: [
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90216779871662, 39.148406432505595],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90287541470984, 39.14843425653056],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90269830053435, 39.148303012779394],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90305624669767, 39.14832391396969],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90638105514978, 39.15180083906827],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90637077410273, 39.15230847141836],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90556370023397, 39.15236552216463],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90537768807908, 39.151910162887255],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90638105514978, 39.15180083906827],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90641910302763, 39.15197116820975],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90611177190539, 39.150051020365076],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.901433243787, 39.14841092444247],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90537775939093, 39.15166221753938],
      }
    },
    {
      geometry: {
        type: 'Point',
        coordinates: [-91.90206476304394, 39.14917565473722],
      }
    },
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
        this.focus([coords])
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
          <Geojson geojson={points} strokeColor='red' strokeWidth={5} />
        </MapView>
      </View>
    )
  }
}

AppRegistry.registerComponent('MapDemo', () => MapDemo)
