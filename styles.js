import { StyleSheet, Dimensions } from 'react-native';
const  { width } = Dimensions.get('window');

export default styles = StyleSheet.create({
  body: {
    backgroundColor: '#dedede'
  },
  gallery:{
    display: 'flex',
    width: 900,
    margin: 'auto',
    justifyContent: 'space-between',
    //flexWrap: wrap
  },
  figure:{
    width: 200,
    marginTop: 8,
    marginBottom: 8,
    marginRight: 0,
    marginLeft: 0,
    borderWidth: 100 ,
    borderStyle: 'solid',
    borderColor: '#777',
    padding: 8,
   // box-sizing: border-box;
    backgroundColor: '#fff'
  },
  figureImg: {
    width: '100%',
  },
   figcaption :{
    textAlign: 'center',
    paddingTop: 8 ,
    paddingBottom: 8,
    paddingRight: 4,
    paddingLeft: 4
  },
  container: {
    flex: 1,
    backgroundColor: '#dedede'
  },
  coverPhoto: {
    flex: 1,
    resizeMode:'contain'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row'
  },
  bold: {
    fontWeight: 'bold',
  },
  white: {
    color: '#fff',
  },
  gray: {
    color: '#adadad',
  },
  small: {
    fontSize: 10,
  },
  input: {
    width: width*.90,
    margin: 15,
    padding: 15,
    alignSelf: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 50,
  },
  facebookButton: {
    backgroundColor: '#3b5998',
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#3b5998',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  pickerBorder: {
    width: '85%',
    margin: 10,
    paddingLeft: 157,
    paddingTop: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  homeBorder: {
    textAlign: 'center',
    color: '#000',
    borderStyle: 'solid', 
    borderColor: '#A9A9A9',
    borderWidth: 1.5,
    paddingTop: 12,
    paddingBottom: 30,
    paddingRight: 12,
    paddingLeft: 12,
    marginTop: 0,
    marginBottom: 10,
    marginRight: 5 ,
    marginLeft: 5,
    backgroundColor: "#fff"
  },
  border: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  postPhoto: {
    height: 350,
    width: null,
  },
  roundImage: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    margin: 10,
    marginLeft: 30,
    backgroundColor: '#adadad'
  },
  squareLarge: {
    width: width*.33, 
    height: 125,
    margin: 1,
    backgroundColor: '#d3d3d3'
  },
  cameraButton: {
    height: 100, 
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginBottom: 50
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonSmall: {
    margin: 10,
    marginBottom: 0,
    padding: 5,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    width: 125
  },
  homeImage: {
    flex: 1,
    height: 450,
    width: "87%",
    resizeMode: "cover",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 25,
    marginLeft: 27
    
  }
});
