import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  excludeFooter: {
    flex: 1 
  },
  giveSpace: {
    marginTop: 20,
  },
  bg: {
    backgroundColor: '#rgb(15, 15, 15)'
  },
  header: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 15,
    backgroundColor: 'rgb(216, 30, 173)',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'rgb(216, 30, 173)',
    flexDirection: 'row',
    position: 'fixed',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  buttonText: {
    fontFamily: 'Fjalla',
    color:"#2B2B52",
    fontSize: 20
  },
  text: {
    fontFamily: 'Oswald',
    marginTop: 10,
    color: 'rgb(216, 30, 173)'
  },
  inputTextColor: {
    color: '#fff',
    backgroundColor: 'rgb(170, 170, 170)',
    padding: 5,
    margin: 5,
    width: 200,
  },
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    backgroundColor: 'rgb(216, 30, 173)',
    borderWidth: 5,
    borderColor: '#fff',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  }
});