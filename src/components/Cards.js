import React from 'react';
import './css/Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Mira nuestras opciones</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Registra tu nueva mascota'
              label='Mascotas'
              path='/new-pet'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Programa tus citas'
              label='Citas'
              path='/new-cita'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Staff de Veterinarios'
              label='Veterinarios'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Nuestros productos'
              label='Tienda'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Conoce nuestros lugares de atención'
              label='Sedes'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
