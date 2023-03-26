/// <reference types="vite/client" />

/*


  1) Ввести {id1}
  2) Вычислить площадь прямоугольника по формуле P = {id2} * ( a + {id3} )
  3) Вывести результат {id4}

  options = [
    {
      id: "id1",
      type:"select",
      variants: [
        new Variant<number>().setLabel("стороны параллелограмма c, d").setValue(1),
        new Variant<number>().setLabel("площадь параллелограмма").setValue(0),
        new Variant<number>().setLabel("стороны параллелограмма a, b").setValue(0)
        ]
    },
    {
      id: "id2",
      type: "text",
      value: "2" 
    },
    {
      id: "id3",
      type: "text",
      value: "b"
    },
    {
      id: "id4",
      type: "select",
      variants: [
        new Variant<number>().setLabel("a").setValue(0), 
        new Variant<number>().setLabel("P").setValue(1), 
        new Variant<number>().setLabel("d").setValue(0)
    ]
    }
  ]

*/
