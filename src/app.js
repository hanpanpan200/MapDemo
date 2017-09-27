import React, { Component } from 'react'
import { View, AppRegistry, StyleSheet } from 'react-native'
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
})

const multiline = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'MultiLineString',
        coordinates: [
          [
              [170.0, 45.0], [180.0, 45.0]
          ], [
              [-180.0, 45.0], [-170.0, 45.0]
          ]
        ],
      }
    }
  ]
}
const point = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [100.0, 0.0],
      }
    }
  ]
}

const polygon = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
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

export default class MapDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}>
          <Geojson geojson={multiline} strokeColor='red' strokeWidth={10} />
          <Geojson geojson={point} color='yellow' />
          <Geojson geojson={polygon} fillColor='green' strokeColor='blue' strokeWidth={5} />
        </MapView>
      </View>
    )
  }
}

AppRegistry.registerComponent('MapDemo', () => MapDemo)
