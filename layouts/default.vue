<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.main {
  color: white;
  margin-top: 60px;

  margin-left: auto;
  margin-right: auto;

  max-width: 625px;
  padding-top: 0;
  padding-bottom: 2.5em;
}
body {
  background-color: black;
}

a,
h1 {
  color: white;
}
button {
  background-color: white;
}
textarea:focus, 
input:focus,
button:focus {
    outline: none;
}
h3 {
    margin-top: 3em;
}
.nav-panel {
    text-align: right;
    margin-top: 3.5em;
}
.nav-panel button {
    color: black;
    background-color: white;
}

input[type=text],
textarea {
    color: #333;
    box-sizing: border-box;
    padding: 1ex;
    font-size: 1em;
    border-radius: 10px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    display: block;
    width: 100%;
}
button {
    border-radius: 10px;
    border-style: dotted;
    padding: 2ex;
    font-size: 1em;
    color: white;
    background-color: transparent;
}
button.selected {
    background-color: #822;
    color: white;
    border-color: red;
}
.button-panel button {
    display: block;
    margin-bottom: 1.1em;
}
 
 input[type="color"],
 input[type="date"],
 input[type="datetime"],
 input[type="datetime-local"],
 input[type="email"],
 input[type="month"],
 input[type="number"],
 input[type="password"],
 input[type="search"],
 input[type="tel"],
 input[type="text"],
 input[type="time"],
 input[type="url"],
 input[type="week"],
 select,
 select:focus,
 textarea {
   font-size: 16px;
 }
 
 [v-cloak] { 
    display: none ;
 }
 
 @media (min-width: 525px) { 
 
 }
</style>
