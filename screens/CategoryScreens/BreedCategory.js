import React from 'react';
import styles from '../../styles.js'
import styles1 from '../../styles1'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity,Dimensions, TouchableWithoutFeedback } from 'react-native';
import db from '../../config/firebase';
import { getDog } from '../../actions/dog'
import DogInfo from '../DogInfo';
import Category from '../Category';
import { ScrollView } from 'react-native';
const  { width,height } = Dimensions.get('window');
import RNPickerSelect from 'react-native-picker-select';

class BreedCategory extends React.Component {
    constructor(props) {
        super(props);
          this.state = { 
              dogBreed: ""
          }
      }
    render() {
        return (
            <ScrollView>
            
         
            <Text style={{fontWeight:"700",fontSize: 18,paddingTop: 5,paddingBottom: 10,paddingHorizontal: (width/4) + 5 }}>View Dogs By Breed</Text>
            <TouchableWithoutFeedback >
            <View style={{paddingHorizontal: (width/4),paddingTop: 5 }}>
           
            <View style={{justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                height: 30,
                width: 160,
                borderRadius: 25,
                backgroundColor: '#5490fe',
                paddingTop: 5}}>
             <RNPickerSelect
             placeholder={{
              label: "Click to View all Breeds",
              color: 'red'
            }}
            onValueChange={(dogBreed) => this.setState({dogBreed})}
            onDonePress = {() => this.props.navigation.navigate('BreedPosts', {breed: this.state.dogBreed })}
           
            items={breeds}
         />
          </View>
        
         </View>
         </TouchableWithoutFeedback >
            <View
                     style={{
                      flexDirection: "row",
                      padding: 10,
                      marginTop: 5,
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
            
            
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BreedPosts', {breed: 'Labrador Retriever' })}>
            <Category
               width={width}
               height={height}
               info ='Labrador Retriever'
               infoImage ={require('../../assets/labradorretriever.jpeg')}
             />
             </TouchableOpacity>
   
             <TouchableOpacity onPress={() => this.props.navigation.navigate('BreedPosts', {breed: 'Golden Retriever' })}>
               <Category
               width={width}
               height={height}
               info ='Golden Retriever'
               infoImage ={require('../../assets/goldenretriever.jpeg')}
             />
             </TouchableOpacity>
   
              <TouchableOpacity onPress={() => this.props.navigation.navigate('BreedPosts', {breed: 'German Shepherd' })}>
               
               <Category
               width={width}
               height={height}
               info ='German Shepherd'
               infoImage={require('../../assets/germanshepard.jpeg')}
             />
             </TouchableOpacity>
   
             <TouchableOpacity onPress={() => this.props.navigation.navigate('BreedPosts', {breed: 'French Bulldog' })}>
               <Category
               width={width}
               height={height}
               info ='French Bulldog'
               infoImage={require('../../assets/frenchbulldog.jpeg')}
             />
             </TouchableOpacity>
             <TouchableOpacity onPress={() => this.props.navigation.navigate('BreedPosts', {breed: 'Bulldog' })}>
              <Category
               width={width}
               height={height}
               info ='Bulldog'
               infoImage={require('../../assets/bulldog.jpeg')}
             />
             </TouchableOpacity>
             <TouchableOpacity onPress={() => this.props.navigation.navigate('BreedPosts', {breed: 'Poodle' })}>
               <Category
               width={width}
               height={height}
               info ='Poodle'
               infoImage={require('../../assets/poodle.jpeg')}
             />
             </TouchableOpacity>
             </View>
              </ScrollView>
       );
        }
       
}

let breeds =[
    {label: 'Mixed',value: 'Mixed'},
    {label: 'Affenpinscher',value: 'Affenpinscher'},
    {label: 'Afghan Hound',value: 'Afghan Hound'},
    {label: 'Aidi',value: 'Aidi'},
    {label: 'Airedale Terrier',value: 'Airedale Terrier'},
    {label: 'Akbash Dog',value: 'Akbash Dog'},
    {label: 'Akita',value: 'Akita'},
    {label: 'Alano Español',value: 'Alano Español'},
    {label: 'Alaskan Klee Kai',value: 'Alaskan Klee Kai'},
    {label: 'Alaskan Malamute',value: 'Alaskan Malamute'},
    {label: 'Alpine Dachsbracke',value: 'Alpine Dachsbracke'},
    {label: 'Alpine Spaniel',value: 'Alpine Spaniel'},
    {label: 'American Bulldog',value: 'American Bulldog'},
    {label: 'American Cocker Spaniel',value: 'American Cocker Spaniel'},
    {label: 'American Eskimo Dog',value: 'American Eskimo Dog'},
    {label: 'American Foxhound',value: 'American Foxhound'},
    {label: 'American Hairless Terrier',value: 'American Hairless Terrier'},
    {label: 'American Pit Bull Terrier',value: 'American Pit Bull Terrier'},
    {label: 'American Staffordshire Terrier',value: 'American Staffordshire Terrier'},
    {label: 'American Water Spaniel',value: 'American Water Spaniel'},
    {label: 'Anglo-Français de Petite Vénerie',value: 'Anglo-Français de Petite Vénerie'},
    {label: 'Appenzeller Sennenhund',value: 'Appenzeller Sennenhund'},
    {label: 'Ariege Pointer',value: 'Ariege Pointer'},
    {label: 'Ariegeois',value: 'Ariegeois'},
    {label: 'Armant',value: 'Armant'},
    {label: 'Armenian Gampr dog',value: 'Armenian Gampr dog'},
    {label: 'Artois Hound',value: 'Artois Hound'},
    {label: 'Australian Cattle Dog',value: 'Australian Cattle Dog'},
    {label: 'Australian Kelpie',value: 'Australian Kelpie'},
    {label: 'Australian Shepherd',value: 'Australian Shepherd'},
    {label: 'Australian Silky Terrier',value: 'Australian Silky Terrier'},
    {label: 'Australian Stumpy Tail Cattle Dog',value: 'Australian Stumpy Tail Cattle Dog'},
    {label: 'Australian Terrier',value: 'Australian Terrier'},
    {label: 'Azawakh',value: 'Azawakh'},
    {label: 'Bakharwal Dog',value: 'Bakharwal Dog'},
    {label: 'Barbet',value: 'Barbet'},
    {label: 'Basenji',value: 'Basenji'},
    {label: 'Basque Shepherd Dog',value: 'Basque Shepherd Dog'},
    {label: 'Basset Artésien Normand',value: 'Basset Artésien Normand'},
    {label: 'Basset Bleu de Gascogne',value: 'Basset Bleu de Gascogne'},
    {label: 'Basset Fauve de Bretagne',value: 'Basset Fauve de Bretagne'},
    {label: 'Basset Hound',value: 'Basset Hound'},
    {label: 'Bavarian Mountain Hound',value: 'Bavarian Mountain Hound'},
    {label: 'Beagle',value: 'Beagle'},
    {label: 'Beagle-Harrier',value: 'Beagle-Harrier'},
    {label: 'Bearded Collie',value: 'Bearded Collie'},
    {label: 'Beauceron',value: 'Beauceron'},
    {label: 'Bedlington Terrier',value: 'Bedlington Terrier'},
    {label: 'Belgian Shepherd Dog (Groenendael)',value: 'Belgian Shepherd Dog (Groenendael)'},
    {label: 'Belgian Shepherd Dog (Laekenois)',value: 'Belgian Shepherd Dog (Laekenois)'},
    {label: 'Belgian Shepherd Dog (Malinois)',value: 'Belgian Shepherd Dog (Malinois)'},
    {label: 'Bergamasco Shepherd',value: 'Bergamasco Shepherd'},
    {label: 'Berger Blanc Suisse',value: 'Berger Blanc Suisse'},
    {label: 'Berger Picard',value: 'Berger Picard'},
    {label: 'Berner Laufhund',value: 'Berner Laufhund'},
    {label: 'Bernedoodle',value: 'Bernedoodle'},
    {label: 'Bernese Mountain Dog',value: 'Bernese Mountain Dog'},
    {label: 'Billy',value: 'Billy'},
    {label: 'Black and Tan Coonhound',value: 'Black and Tan Coonhound'},
    {label: 'Black and Tan Virginia Foxhound',value: 'Black and Tan Virginia Foxhound'},
    {label: 'Black Norwegian Elkhound',value: 'Black Norwegian Elkhound'},
    {label: 'Black Russian Terrier',value: 'Black Russian Terrier'},
    {label: 'Bloodhound',value: 'Bloodhound'},
    {label: 'Blue Lacy',value: 'Blue Lacy'},
    {label: 'Blue Paul Terrier',value: 'Blue Paul Terrier'},
    {label: 'Boerboel',value: 'Boerboel'},
    {label: 'Bohemian Shepherd',value: 'Bohemian Shepherd'},
    {label: 'Bolognese',value: 'Bolognese'},
    {label: 'Border Collie',value: 'Border Collie'},
    {label: 'Border Terrier',value: 'Border Terrier'},
    {label: 'Borzoi',value: 'Borzoi'},
    {label: 'Boston Terrier',value: 'Boston Terrier'},
    {label: 'Bouvier des Ardennes',value: 'Bouvier des Ardennes'},
    {label: 'Bouvier des Flandres',value: 'Bouvier des Flandres'},
    {label: 'Boxer',value: 'Boxer'},
    {label: 'Boykin Spaniel',value: 'Boykin Spaniel'},
    {label: 'Bracco Italiano',value: 'Bracco Italiano'},
    {label: 'Braque d\'Auvergne',value: 'Braque d\'Auvergne'},
    {label: 'Braque du Bourbonnais',value: 'Braque du Bourbonnais'},
    {label: 'Braque du Puy',value: 'Braque du Puy'},
    {label: 'Braque Francais',value: 'Braque Francais'},
    {label: 'Braque Saint-Germain',value: 'Braque Saint-Germain'},
    {label: 'Brazilian Terrier',value: 'Brazilian Terrier'},
    {label: 'Briard',value: 'Briard'},
    {label: 'Briquet Griffon Vendéen',value: 'Briquet Griffon Vendéen'},
    {label: 'Brittany',value: 'Brittany'},
    {label: 'Broholmer',value: 'Broholmer'},
    {label: 'Bruno Jura Hound',value: 'Bruno Jura Hound'},
    {label: 'Bucovina Shepherd Dog',value: 'Bucovina Shepherd Dog'},
    {label: 'Bull and Terrier',value: 'Bull and Terrier'},
    {label: 'Bull Terrier (Miniature)',value: 'Bull Terrier (Miniature)'},
    {label: 'Bull Terrier',value: 'Bull Terrier'},
    {label: 'Bulldog',value: 'Bulldog'},
    {label: 'Bullenbeisser',value: 'Bullenbeisser'},
    {label: 'Bullmastiff',value: 'Bullmastiff'},
    {label: 'Bully Kutta',value: 'Bully Kutta'},
    {label: 'Burgos Pointer',value: 'Burgos Pointer'},
    {label: 'Cairn Terrier',value: 'Cairn Terrier'},
    {label: 'Canaan Dog',value: 'Canaan Dog'},
    {label: 'Canadian Eskimo Dog',value: 'Canadian Eskimo Dog'},
    {label: 'Cane Corso',value: 'Cane Corso'},
    {label: 'Cardigan Welsh Corgi',value: 'Cardigan Welsh Corgi'},
    {label: 'Carolina Dog',value: 'Carolina Dog'},
    {label: 'Carpathian Shepherd Dog',value: 'Carpathian Shepherd Dog'},
    {label: 'Catahoula Cur',value: 'Catahoula Cur'},
    {label: 'Catalan Sheepdog',value: 'Catalan Sheepdog'},
    {label: 'Caucasian Shepherd Dog',value: 'Caucasian Shepherd Dog'},
    {label: 'Cavalier King Charles Spaniel',value: 'Cavalier King Charles Spaniel'},
    {label: 'Central Asian Shepherd Dog',value: 'Central Asian Shepherd Dog'},
    {label: 'Cesky Fousek',value: 'Cesky Fousek'},
    {label: 'Cesky Terrier',value: 'Cesky Terrier'},
    {label: 'Chesapeake Bay Retriever',value: 'Chesapeake Bay Retriever'},
    {label: 'Chien Français Blanc et Noir',value: 'Chien Français Blanc et Noir'},
    {label: 'Chien Français Blanc et Orange',value: 'Chien Français Blanc et Orange'},
    {label: 'Chien Français Tricolore',value: 'Chien Français Tricolore'},
    {label: 'Chien-gris',value: 'Chien-gris'},
    {label: 'Chihuahua',value: 'Chihuahua'},
    {label: 'Chilean Fox Terrier',value: 'Chilean Fox Terrier'},
    {label: 'Chinese Chongqing Dog',value: 'Chinese Chongqing Dog'},
    {label: 'Chinese Crested Dog',value: 'Chinese Crested Dog'},
    {label: 'Chinese Imperial Dog',value: 'Chinese Imperial Dog'},
    {label: 'Chinook',value: 'Chinook'},
    {label: 'Chippiparai',value: 'Chippiparai'},
    {label: 'Chow Chow',value: 'Chow Chow'},
    {label: 'Cierny Sery',value: 'Cierny Sery'},
    {label: 'Cimarrón Uruguayo',value: 'Cimarrón Uruguayo'},
    {label: 'Cirneco dell\'Etna',value: 'Cirneco dell\'Etna'},
    {label: 'Clumber Spaniel',value: 'Clumber Spaniel'},
    {label: 'Combai',value: 'Combai'},
    {label: 'Cordoba Fighting Dog',value: 'Cordoba Fighting Dog'},
    {label: 'Coton de Tulear',value: 'Coton de Tulear'},
    {label: 'Cretan Hound',value: 'Cretan Hound'},
    {label: 'Croatian Sheepdog',value: 'Croatian Sheepdog'},
    {label: 'Cumberland Sheepdog',value: 'Cumberland Sheepdog'},
    {label: 'Curly Coated Retriever',value: 'Curly Coated Retriever'},
    {label: 'Cursinu',value: 'Cursinu'},
    {label: 'Cão da Serra de Aires',value: 'Cão da Serra de Aires'},
    {label: 'Cão de Castro Laboreiro',value: 'Cão de Castro Laboreiro'},
    {label: 'Cão Fila de São Miguel',value: 'Cão Fila de São Miguel'},
    {label: 'Dachshund',value: 'Dachshund'},
    {label: 'Dalmatian',value: 'Dalmatian'},
    {label: 'Dandie Dinmont Terrier',value: 'Dandie Dinmont Terrier'},
    {label: 'Danish Swedish Farmdog',value: 'Danish Swedish Farmdog'},
    {label: 'Deutsche Bracke',value: 'Deutsche Bracke'},
    {label: 'Doberman Pinscher',value: 'Doberman Pinscher'},
    {label: 'Dogo Argentino',value: 'Dogo Argentino'},
    {label: 'Dogo Cubano',value: 'Dogo Cubano'},
    {label: 'Dogue de Bordeaux',value: 'Dogue de Bordeaux'},
    {label: 'Drentse Patrijshond',value: 'Drentse Patrijshond'},
    {label: 'Drever',value: 'Drever'},
    {label: 'Dunker',value: 'Dunker'},
    {label: 'Dutch Shepherd Dog',value: 'Dutch Shepherd Dog'},
    {label: 'Dutch Smoushond',value: 'Dutch Smoushond'},
    {label: 'East Siberian Laika',value: 'East Siberian Laika'},
    {label: 'East-European Shepherd',value: 'East-European Shepherd'},
    {label: 'Elo',value: 'Elo'},
    {label: 'English Cocker Spaniel',value: 'English Cocker Spaniel'},
    {label: 'English Foxhound',value: 'English Foxhound'},
    {label: 'English Mastiff',value: 'English Mastiff'},
    {label: 'English Setter',value: 'English Setter'},
    {label: 'English Shepherd',value: 'English Shepherd'},
    {label: 'English Springer Spaniel',value: 'English Springer Spaniel'},
    {label: 'English Toy Terrier (Black &amp; Tan)',value: 'English Toy Terrier (Black &amp; Tan)'},
    {label: 'English Water Spaniel',value: 'English Water Spaniel'},
    {label: 'English White Terrier',value: 'English White Terrier'},
    {label: 'Entlebucher Mountain Dog',value: 'Entlebucher Mountain Dog'},
    {label: 'Estonian Hound',value: 'Estonian Hound'},
    {label: 'Estrela Mountain Dog',value: 'Estrela Mountain Dog'},
    {label: 'Eurasier',value: 'Eurasier'},
    {label: 'Field Spaniel',value: 'Field Spaniel'},
    {label: 'Fila Brasileiro',value: 'Fila Brasileiro'},
    {label: 'Finnish Hound',value: 'Finnish Hound'},
    {label: 'Finnish Lapphund',value: 'Finnish Lapphund'},
    {label: 'Finnish Spitz',value: 'Finnish Spitz'},
    {label: 'Flat-Coated Retriever',value: 'Flat-Coated Retriever'},
    {label: 'Formosan Mountain Dog',value: 'Formosan Mountain Dog'},
    {label: 'Fox Terrier (Smooth)',value: 'Fox Terrier (Smooth)'},
    {label: 'French Bulldog',value: 'French Bulldog'},
    {label: 'French Spaniel',value: 'French Spaniel'},
    {label: 'Galgo Español',value: 'Galgo Español'},
    {label: 'Gascon Saintongeois',value: 'Gascon Saintongeois'},
    {label: 'German Longhaired Pointer',value: 'German Longhaired Pointer'},
    {label: 'German Pinscher',value: 'German Pinscher'},
    {label: 'German Shepherd',value: 'German Shepherd'},
    {label: 'German Shorthaired Pointer',value: 'German Shorthaired Pointer'},
    {label: 'German Spaniel',value: 'German Spaniel'},
    {label: 'German Spitz',value: 'German Spitz'},
    {label: 'German Wirehaired Pointer',value: 'German Wirehaired Pointer'},
    {label: 'Giant Schnauzer',value: 'Giant Schnauzer'},
    {label: 'Glen of Imaal Terrier',value: 'Glen of Imaal Terrier'},
    {label: 'Golden Retriever',value: 'Golden Retriever'},
    {label: 'Gordon Setter',value: 'Gordon Setter'},
    {label: 'Gran Mastín de Borínquen',value: 'Gran Mastín de Borínquen'},
    {label: 'Grand Anglo-Français Blanc et Noir',value: 'Grand Anglo-Français Blanc et Noir'},
    {label: 'Grand Anglo-Français Blanc et Orange',value: 'Grand Anglo-Français Blanc et Orange'},
    {label: 'Grand Anglo-Français Tricolore',value: 'Grand Anglo-Français Tricolore'},
    {label: 'Grand Basset Griffon Vendéen',value: 'Grand Basset Griffon Vendéen'},
    {label: 'Grand Bleu de Gascogne',value: 'Grand Bleu de Gascogne'},
    {label: 'Grand Griffon Vendéen',value: 'Grand Griffon Vendéen'},
    {label: 'Great Dane',value: 'Great Dane'},
    {label: 'Great Pyrenees',value: 'Great Pyrenees'},
    {label: 'Greater Swiss Mountain Dog',value: 'Greater Swiss Mountain Dog'},
    {label: 'Greek Harehound',value: 'Greek Harehound'},
    {label: 'Greenland Dog',value: 'Greenland Dog'},
    {label: 'Greyhound',value: 'Greyhound'},
    {label: 'Griffon Bleu de Gascogne',value: 'Griffon Bleu de Gascogne'},
    {label: 'Griffon Bruxellois',value: 'Griffon Bruxellois'},
    {label: 'Griffon Fauve de Bretagne',value: 'Griffon Fauve de Bretagne'},
    {label: 'Griffon Nivernais',value: 'Griffon Nivernais'},
    {label: 'Hamiltonstövare',value: 'Hamiltonstövare'},
    {label: 'Hanover Hound',value: 'Hanover Hound'},
    {label: 'Hare Indian Dog',value: 'Hare Indian Dog'},
    {label: 'Harrier',value: 'Harrier'},
    {label: 'Havanese',value: 'Havanese'},
    {label: 'Hawaiian Poi Dog',value: 'Hawaiian Poi Dog'},
    {label: 'Himalayan Sheepdog',value: 'Himalayan Sheepdog'},
    {label: 'Hokkaido',value: 'Hokkaido'},
    {label: 'Hovawart',value: 'Hovawart'},
    {label: 'Huntaway',value: 'Huntaway'},
    {label: 'Hygenhund',value: 'Hygenhund'},
    {label: 'Ibizan Hound',value: 'Ibizan Hound'},
    {label: 'Icelandic Sheepdog',value: 'Icelandic Sheepdog'},
    {label: 'Indian pariah dog',value: 'Indian pariah dog'},
    {label: 'Indian Spitz',value: 'Indian Spitz'},
    {label: 'Irish Red and White Setter',value: 'Irish Red and White Setter'},
    {label: 'Irish Setter',value: 'Irish Setter'},
    {label: 'Irish Terrier',value: 'Irish Terrier'},
    {label: 'Irish Water Spaniel',value: 'Irish Water Spaniel'},
    {label: 'Irish Wolfhound',value: 'Irish Wolfhound'},
    {label: 'Istrian Coarse-haired Hound',value: 'Istrian Coarse-haired Hound'},
    {label: 'Istrian Shorthaired Hound',value: 'Istrian Shorthaired Hound'},
    {label: 'Italian Greyhound',value: 'Italian Greyhound'},
    {label: 'Jack Russell Terrier',value: 'Jack Russell Terrier'},
    {label: 'Jagdterrier',value: 'Jagdterrier'},
    {label: 'Jämthund',value: 'Jämthund'},
    {label: 'Kai Ken',value: 'Kai Ken'},
    {label: 'Kaikadi',value: 'Kaikadi'},
    {label: 'Kanni',value: 'Kanni'},
    {label: 'Karelian Bear Dog',value: 'Karelian Bear Dog'},
    {label: 'Karst Shepherd',value: 'Karst Shepherd'},
    {label: 'Keeshond',value: 'Keeshond'},
    {label: 'Kerry Beagle',value: 'Kerry Beagle'},
    {label: 'Kerry Blue Terrier',value: 'Kerry Blue Terrier'},
    {label: 'King Charles Spaniel',value: 'King Charles Spaniel'},
    {label: 'King Shepherd',value: 'King Shepherd'},
    {label: 'Kintamani',value: 'Kintamani'},
    {label: 'Kishu',value: 'Kishu'},
    {label: 'Komondor',value: 'Komondor'},
    {label: 'Kooikerhondje',value: 'Kooikerhondje'},
    {label: 'Koolie',value: 'Koolie'},
    {label: 'Korean Jindo Dog',value: 'Korean Jindo Dog'},
    {label: 'Kromfohrländer',value: 'Kromfohrländer'},
    {label: 'Kumaon Mastiff',value: 'Kumaon Mastiff'},
    {label: 'Kurī',value: 'Kurī'},
    {label: 'Kuvasz',value: 'Kuvasz'},
    {label: 'Kyi-Leo',value: 'Kyi-Leo'},
    {label: 'Labrador Husky',value: 'Labrador Husky'},
    {label: 'Labrador Retriever',value: 'Labrador Retriever'},
    {label: 'Lagotto Romagnolo',value: 'Lagotto Romagnolo'},
    {label: 'Lakeland Terrier',value: 'Lakeland Terrier'},
    {label: 'Lancashire Heeler',value: 'Lancashire Heeler'},
    {label: 'Landseer',value: 'Landseer'},
    {label: 'Lapponian Herder',value: 'Lapponian Herder'},
    {label: 'Large Münsterländer',value: 'Large Münsterländer'},
    {label: 'Leonberger',value: 'Leonberger'},
    {label: 'Lhasa Apso',value: 'Lhasa Apso'},
    {label: 'Lithuanian Hound',value: 'Lithuanian Hound'},
    {label: 'Longhaired Whippet',value: 'Longhaired Whippet'},
    {label: 'Löwchen',value: 'Löwchen'},
    {label: 'Mahratta Greyhound',value: 'Mahratta Greyhound'},
    {label: 'Maltese',value: 'Maltese'},
    {label: 'Manchester Terrier',value: 'Manchester Terrier'},
    {label: 'Maremma Sheepdog',value: 'Maremma Sheepdog'},
    {label: 'McNab',value: 'McNab'},
    {label: 'Mexican Hairless Dog',value: 'Mexican Hairless Dog'},
    {label: 'Miniature American Shepherd',value: 'Miniature American Shepherd'},
    {label: 'Miniature Australian Shepherd',value: 'Miniature Australian Shepherd'},
    {label: 'Miniature Fox Terrier',value: 'Miniature Fox Terrier'},
    {label: 'Miniature Pinscher',value: 'Miniature Pinscher'},
    {label: 'Miniature Schnauzer',value: 'Miniature Schnauzer'},
    {label: 'Miniature Shar Pei',value: 'Miniature Shar Pei'},
    {label: 'Molossus',value: 'Molossus'},
    {label: 'Montenegrin Mountain Hound',value: 'Montenegrin Mountain Hound'},
    {label: 'Moscow Watchdog',value: 'Moscow Watchdog'},
    {label: 'Moscow Water Dog',value: 'Moscow Water Dog'},
    {label: 'Mountain Cur',value: 'Mountain Cur'},
    {label: 'Mucuchies',value: 'Mucuchies'},
    {label: 'Mudhol Hound',value: 'Mudhol Hound'},
    {label: 'Mudi',value: 'Mudi'},
    {label: 'Neapolitan Mastiff',value: 'Neapolitan Mastiff'},
    {label: 'New Zealand Heading Dog',value: 'New Zealand Heading Dog'},
    {label: 'Newfoundland',value: 'Newfoundland'},
    {label: 'Norfolk Spaniel',value: 'Norfolk Spaniel'},
    {label: 'Norfolk Terrier',value: 'Norfolk Terrier'},
    {label: 'Norrbottenspets',value: 'Norrbottenspets'},
    {label: 'North Country Beagle',value: 'North Country Beagle'},
    {label: 'Northern Inuit Dog',value: 'Northern Inuit Dog'},
    {label: 'Norwegian Buhund',value: 'Norwegian Buhund'},
    {label: 'Norwegian Elkhound',value: 'Norwegian Elkhound'},
    {label: 'Norwegian Lundehund',value: 'Norwegian Lundehund'},
    {label: 'Norwich Terrier',value: 'Norwich Terrier'},
    {label: 'Old Croatian Sighthound',value: 'Old Croatian Sighthound'},
    {label: 'Old Danish Pointer',value: 'Old Danish Pointer'},
    {label: 'Old English Sheepdog',value: 'Old English Sheepdog'},
    {label: 'Old English Terrier',value: 'Old English Terrier'},
    {label: 'Old German Shepherd Dog',value: 'Old German Shepherd Dog'},
    {label: 'Olde English Bulldogge',value: 'Olde English Bulldogge'},
    {label: 'Otterhound',value: 'Otterhound'},
    {label: 'Pachon Navarro',value: 'Pachon Navarro'},
    {label: 'Paisley Terrier',value: 'Paisley Terrier'},
    {label: 'Pandikona',value: 'Pandikona'},
    {label: 'Papillon',value: 'Papillon'},
    {label: 'Parson Russell Terrier',value: 'Parson Russell Terrier'},
    {label: 'Patterdale Terrier',value: 'Patterdale Terrier'},
    {label: 'Pekingese',value: 'Pekingese'},
    {label: 'Pembroke Welsh Corgi',value: 'Pembroke Welsh Corgi'},
    {label: 'Perro de Presa Canario',value: 'Perro de Presa Canario'},
    {label: 'Perro de Presa Mallorquin',value: 'Perro de Presa Mallorquin'},
    {label: 'Peruvian Hairless Dog',value: 'Peruvian Hairless Dog'},
    {label: 'Petit Basset Griffon Vendéen',value: 'Petit Basset Griffon Vendéen'},
    {label: 'Petit Bleu de Gascogne',value: 'Petit Bleu de Gascogne'},
    {label: 'Phalène',value: 'Phalène'},
    {label: 'Pharaoh Hound',value: 'Pharaoh Hound'},
    {label: 'Phu Quoc ridgeback dog',value: 'Phu Quoc ridgeback dog'},
    {label: 'Picardy Spaniel',value: 'Picardy Spaniel'},
    {label: 'Plott Hound',value: 'Plott Hound'},
    {label: 'Podenco Canario',value: 'Podenco Canario'},
    {label: 'Pointer (dog breed)',value: 'Pointer (dog breed)'},
    {label: 'Polish Greyhound',value: 'Polish Greyhound'},
    {label: 'Polish Hound',value: 'Polish Hound'},
    {label: 'Polish Hunting Dog',value: 'Polish Hunting Dog'},
    {label: 'Polish Lowland Sheepdog',value: 'Polish Lowland Sheepdog'},
    {label: 'Polish Tatra Sheepdog',value: 'Polish Tatra Sheepdog'},
    {label: 'Pomeranian',value: 'Pomeranian'},
    {label: 'Pont-Audemer Spaniel',value: 'Pont-Audemer Spaniel'},
    {label: 'Poodle',value: 'Poodle'},
    {label: 'Porcelaine',value: 'Porcelaine'},
    {label: 'Portuguese Podengo',value: 'Portuguese Podengo'},
    {label: 'Portuguese Pointer',value: 'Portuguese Pointer'},
    {label: 'Portuguese Water Dog',value: 'Portuguese Water Dog'},
    {label: 'Posavac Hound',value: 'Posavac Hound'},
    {label: 'Pražský Krysařík',value: 'Pražský Krysařík'},
    {label: 'Pudelpointer',value: 'Pudelpointer'},
    {label: 'Pug',value: 'Pug'},
    {label: 'Puli',value: 'Puli'},
    {label: 'Pumi',value: 'Pumi'},
    {label: 'Pungsan Dog',value: 'Pungsan Dog'},
    {label: 'Pyrenean Mastiff',value: 'Pyrenean Mastiff'},
    {label: 'Pyrenean Shepherd',value: 'Pyrenean Shepherd'},
    {label: 'Rafeiro do Alentejo',value: 'Rafeiro do Alentejo'},
    {label: 'Rajapalayam',value: 'Rajapalayam'},
    {label: 'Rampur Greyhound',value: 'Rampur Greyhound'},
    {label: 'Rastreador Brasileiro',value: 'Rastreador Brasileiro'},
    {label: 'Rat Terrier',value: 'Rat Terrier'},
    {label: 'Ratonero Bodeguero Andaluz',value: 'Ratonero Bodeguero Andaluz'},
    {label: 'Redbone Coonhound',value: 'Redbone Coonhound'},
    {label: 'Rhodesian Ridgeback',value: 'Rhodesian Ridgeback'},
    {label: 'Rottweiler',value: 'Rottweiler'},
    {label: 'Rough Collie',value: 'Rough Collie'},
    {label: 'Russell Terrier',value: 'Russell Terrier'},
    {label: 'Russian Spaniel',value: 'Russian Spaniel'},
    {label: 'Russian tracker',value: 'Russian tracker'},
    {label: 'Russo-European Laika',value: 'Russo-European Laika'},
    {label: 'Sabueso Español',value: 'Sabueso Español'},
    {label: 'Saint-Usuge Spaniel',value: 'Saint-Usuge Spaniel'},
    {label: 'Sakhalin Husky',value: 'Sakhalin Husky'},
    {label: 'Saluki',value: 'Saluki'},
    {label: 'Samoyed',value: 'Samoyed'},
    {label: 'Sapsali',value: 'Sapsali'},
    {label: 'Schapendoes',value: 'Schapendoes'},
    {label: 'Schillerstövare',value: 'Schillerstövare'},
    {label: 'Schipperke',value: 'Schipperke'},
    {label: 'Schweizer Laufhund',value: 'Schweizer Laufhund'},
    {label: 'Schweizerischer Niederlaufhund',value: 'Schweizerischer Niederlaufhund'},
    {label: 'Scotch Collie',value: 'Scotch Collie'},
    {label: 'Scottish Deerhound',value: 'Scottish Deerhound'},
    {label: 'Scottish Terrier',value: 'Scottish Terrier'},
    {label: 'Sealyham Terrier',value: 'Sealyham Terrier'},
    {label: 'Segugio Italiano',value: 'Segugio Italiano'},
    {label: 'Seppala Siberian Sleddog',value: 'Seppala Siberian Sleddog'},
    {label: 'Serbian Hound',value: 'Serbian Hound'},
    {label: 'Serbian Tricolour Hound',value: 'Serbian Tricolour Hound'},
    {label: 'Shar Pei',value: 'Shar Pei'},
    {label: 'Shetland Sheepdog',value: 'Shetland Sheepdog'},
    {label: 'Shiba Inu',value: 'Shiba Inu'},
    {label: 'Shih Tzu',value: 'Shih Tzu'},
    {label: 'Shikoku',value: 'Shikoku'},
    {label: 'Shiloh Shepherd Dog',value: 'Shiloh Shepherd Dog'},
    {label: 'Siberian Husky',value: 'Siberian Husky'},
    {label: 'Silken Windhound',value: 'Silken Windhound'},
    {label: 'Sinhala Hound',value: 'Sinhala Hound'},
    {label: 'Skye Terrier',value: 'Skye Terrier'},
    {label: 'Sloughi',value: 'Sloughi'},
    {label: 'Slovak Cuvac',value: 'Slovak Cuvac'},
    {label: 'Slovakian Rough-haired Pointer',value: 'Slovakian Rough-haired Pointer'},
    {label: 'Small Greek Domestic Dog',value: 'Small Greek Domestic Dog'},
    {label: 'Small Münsterländer',value: 'Small Münsterländer'},
    {label: 'Smooth Collie',value: 'Smooth Collie'},
    {label: 'South Russian Ovcharka',value: 'South Russian Ovcharka'},
    {label: 'Southern Hound',value: 'Southern Hound'},
    {label: 'Spanish Mastiff',value: 'Spanish Mastiff'},
    {label: 'Spanish Water Dog',value: 'Spanish Water Dog'},
    {label: 'Spinone Italiano',value: 'Spinone Italiano'},
    {label: 'Sporting Lucas Terrier',value: 'Sporting Lucas Terrier'},
    {label: 'St. Bernard',value: 'St. Bernard'},
    {label: 'St. John\'s water dog',value: 'St. John\'s water dog'},
    {label: 'Stabyhoun',value: 'Stabyhoun'},
    {label: 'Staffordshire Bull Terrier',value: 'Staffordshire Bull Terrier'},
    {label: 'Standard Schnauzer',value: 'Standard Schnauzer'},
    {label: 'Stephens Cur',value: 'Stephens Cur'},
    {label: 'Styrian Coarse-haired Hound',value: 'Styrian Coarse-haired Hound'},
    {label: 'Sussex Spaniel',value: 'Sussex Spaniel'},
    {label: 'Swedish Lapphund',value: 'Swedish Lapphund'},
    {label: 'Swedish Vallhund',value: 'Swedish Vallhund'},
    {label: 'Tahltan Bear Dog',value: 'Tahltan Bear Dog'},
    {label: 'Taigan',value: 'Taigan'},
    {label: 'Talbot',value: 'Talbot'},
    {label: 'Tamaskan Dog',value: 'Tamaskan Dog'},
    {label: 'Teddy Roosevelt Terrier',value: 'Teddy Roosevelt Terrier'},
    {label: 'Telomian',value: 'Telomian'},
    {label: 'Tenterfield Terrier',value: 'Tenterfield Terrier'},
    {label: 'Thai Bangkaew Dog',value: 'Thai Bangkaew Dog'},
    {label: 'Thai Ridgeback',value: 'Thai Ridgeback'},
    {label: 'Tibetan Mastiff',value: 'Tibetan Mastiff'},
    {label: 'Tibetan Spaniel',value: 'Tibetan Spaniel'},
    {label: 'Tibetan Terrier',value: 'Tibetan Terrier'},
    {label: 'Tornjak',value: 'Tornjak'},
    {label: 'Tosa',value: 'Tosa'},
    {label: 'Toy Bulldog',value: 'Toy Bulldog'},
    {label: 'Toy Fox Terrier',value: 'Toy Fox Terrier'},
    {label: 'Toy Manchester Terrier',value: 'Toy Manchester Terrier'},
    {label: 'Toy Trawler Spaniel',value: 'Toy Trawler Spaniel'},
    {label: 'Transylvanian Hound',value: 'Transylvanian Hound'},
    {label: 'Treeing Cur',value: 'Treeing Cur'},
    {label: 'Treeing Walker Coonhound',value: 'Treeing Walker Coonhound'},
    {label: 'Trigg Hound',value: 'Trigg Hound'},
    {label: 'Tweed Water Spaniel',value: 'Tweed Water Spaniel'},
    {label: 'Tyrolean Hound',value: 'Tyrolean Hound'},
    {label: 'Vizsla',value: 'Vizsla'},
    {label: 'Volpino Italiano',value: 'Volpino Italiano'},
    {label: 'Weimaraner',value: 'Weimaraner'},
    {label: 'Welsh Sheepdog',value: 'Welsh Sheepdog'},
    {label: 'Welsh Springer Spaniel',value: 'Welsh Springer Spaniel'},
    {label: 'Welsh Terrier',value: 'Welsh Terrier'},
    {label: 'West Highland White Terrier',value: 'West Highland White Terrier'},
    {label: 'West Siberian Laika',value: 'West Siberian Laika'},
    {label: 'Westphalian Dachsbracke',value: 'Westphalian Dachsbracke'},
    {label: 'Wetterhoun',value: 'Wetterhoun'},
    {label: 'Whippet',value: 'Whippet'},
    {label: 'White Shepherd',value: 'White Shepherd'},
    {label: 'Wire Fox Terrier',value: 'Wire Fox Terrier'},
    {label: 'Wirehaired Pointing Griffon',value: 'Wirehaired Pointing Griffon'},
    {label: 'Wirehaired Vizsla',value: 'Wirehaired Vizsla'},
    {label: 'Yorkshire Terrier',value: 'Yorkshire Terrier'},
    {label: 'Šarplaninac',value: 'Šarplaninac'}]
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDog }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    dog: state.dog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedCategory)