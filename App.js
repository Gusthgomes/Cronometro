import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

function App () {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState('Iniciar');
  const [ultimo, setUltimo] = useState(null);

  function iniciar() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      setBotao("INICIAR");
    } else {
      timer = setInterval(() => {
        ss++;
        if (ss == 60){
          ss = 0;
          mm++;
        }

        if (mm == 60){
          mm = 0;
          hh++;
        }

        let format =
        (hh < 10 ? '0' + hh : hh) + ':'
        + (mm < 10 ? '0' + mm : mm) + ':'
        + (ss < 10 ? '0' + ss : ss);

        setNumero(format);

      }, 1000);

      setBotao('PAUSAR');

    }
  }

  function parar () {
    if(timer !== null){
      clearInterval(timer);
      timer = null;
    }

    setUltimo(numero);
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao('INICIAR');
  }


  return (
    <View style={styles.container}>

      <Image
      source={require('./src/crono.png')}
      style={styles.img}
      />
      <Text style={styles.timer}> {numero} </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.btnText}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={parar}>
          <Text style={styles.btnText}>LIMPAR</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.textoUltima}>
        <Text style={styles.ultimoTimer}>
          {ultimo ? 'Ultimo tempo: ' + ultimo: ''}
        </Text>
      </View>
    
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00aeef"
  },
  img: {
    width: 250,
    height: 310,
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 26,
  },
  btnText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  textoUltima: {
    marginTop: 40,
  },
  ultimoTimer: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    fontStyle: 'italic',
  },

});



export default App;