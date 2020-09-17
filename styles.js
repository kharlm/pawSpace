import { StyleSheet, Dimensions } from 'react-native';
const  { width } = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
   
  },
  coverPhoto: {
    flex: 1,
    resizeMode:'contain'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
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
    color: '#585858',
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
    fontSize: 16,
  },
  icon: {
    paddingLeft: 10
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    height: 250,
    width: width,
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
    width: width*.26, 
    height: 125,
    margin: 3,
    backgroundColor: '#d3d3d3'
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#B0BEC5',
  },
  cameraButton: {
    height: 100, 
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginBottom: 50
  },
  dogInfoLeft : {

    marginTop: 20,
    paddingVertical: 10,
    marginRight: 30,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    backgroundColor:'#f0ffff',
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
    overflow: 'hidden'

  },
  dogInfoRight : {

    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    backgroundColor:'#f0ffff',
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
    overflow: 'hidden'

  },

  dogInfoRightBig : {

    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: '#d3d3d3',
    backgroundColor:'#fffff0',
    borderWidth: 1,
    borderRadius: 25,
    width: 200,
    height: 200,
    overflow: 'hidden'

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
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardButton: {
    margin: 10,
   padding: 5,
    paddingLeft: 10,
    backgroundColor:'#D3D3D3',
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 15,
    width: 75
  },

  dogLeftInfoPic:{

    flex: 1,
    height: 250,
    width: "87%",
    resizeMode: "cover",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 25,
    marginLeft: 1

  },
  homeBorder: {
    textAlign: 'center',
    color: '#000',
    borderStyle: 'solid', 
    borderColor: '#696969',
    borderWidth: 1.5,
    paddingTop: 4,
    paddingBottom: 10,
    paddingRight: 4,
    paddingLeft: 4,
    marginTop: 0,
    marginBottom: 10,
    marginRight: 5 ,
    marginLeft: 5,
    backgroundColor: "#fff"
  },
  activityIndicator: {
    position: 'absolute',
    top: 100,
    left: 70,
    right: 70,
    height: 50,
},
  homeImage: {
    flex: 1,
    height: 450,
    width: "95%",
    resizeMode: "cover",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 25,
    marginLeft: 10
  },
  homeVideo: {
    flex: 1,
    height: 510,
    width: "95%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 25,
    marginLeft: 10 
  }
});
