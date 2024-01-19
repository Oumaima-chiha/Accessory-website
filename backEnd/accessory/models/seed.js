const prisma = require("./index");
const bcrypt = require("bcrypt");


const createJewelries = async () => {
    await prisma.jewelry.createMany({
      data: [
        {
          name:"Earings",
          category:["EARINGS"],
          description:
            "Express your individuality with our diverse earring collection, ranging from classic studs to bold hoops and elegant dangles, enhancing every outfit with finesse.",
          main_image:
            "https://images.unsplash.com/photo-1630019925419-5fc53b4a52cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RUFSSU5HU3xlbnwwfHwwfHx8MA%3D%3D",

          extra_images: [
            "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
          ],

          status: "Available",
          price:12,

          createdAt: new Date("2023-06-05").toISOString(),
        },
        {
            name: "Earing",
            category: ["EARINGS"],
            description:
              "Express your individuality with our diverse earring collection, ranging from classic studs to bold hoops and elegant dangles, enhancing every outfit with finesse.",
            main_image:
              "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",

            extra_images: [
              "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Necklace",
            category: ["NECKLACES"],
            description:
              " Embrace elegance with our diverse range of necklaces, featuring timeless pendants, delicate chains, and intricate designs that add a touch of sophistication to any ensemble.",
            main_image:
              "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",

            extra_images: [
              "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
              "https://images.unsplash.com/photo-1631050165155-421c47e306f7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Necklaces",
            category: ["NECKLACES"],
            description:
              " Embrace elegance with our diverse range of necklaces, featuring timeless pendants, delicate chains, and intricate designs that add a touch of sophistication to any ensemble.",
            main_image:
              "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

            extra_images: [
              "https://images.unsplash.com/photo-1685970731571-72ede0cb26ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Rings",
            category: ["RINGS"],
            description:
              "Effortlessly elevate your style with our exquisite collection of rings, from minimalist bands to statement gemstone pieces, perfect for every occasion.",
            main_image:
              "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

            extra_images: [
              "https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Ring",
            category: ["RINGS"],
            description:
              "Effortlessly elevate your style with our exquisite collection of rings, from minimalist bands to statement gemstone pieces, perfect for every occasion.",
            main_image:
              "https://images.unsplash.com/photo-1603561589171-f8f02d8d6a5a?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

            extra_images: [
              "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
              "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
        ],
            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },     {
            name: "Hair Clip",
            category: ["HAIRCLIPS"],
            description:
              "Elevate your hair game with our chic and functional hair clips, crafted to add flair and sophistication to your everyday hairstyles effortlessly.",
            main_image:
              "https://plus.unsplash.com/premium_photo-1692340973540-259ea6ceb52c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

            extra_images: [
              "https://plus.unsplash.com/premium_photo-1692340973754-224eecd37905?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },     {
            name: "Hair Clips",
            category: ["HAIRCLIPS"],
            description:
              "Elevate your hair game with our chic and functional hair clips, crafted to add flair and sophistication to your everyday hairstyles effortlessly.",
            main_image:
              "https://images.unsplash.com/photo-1609536834325-f9ecf43992f6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

            extra_images: [
              "https://images.unsplash.com/photo-1609536834585-fc94c33ebee6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Hair bands",
            category: ["HAIRBANDS"],
            description:
              " From sleek and simple designs to vibrant patterns, our hair bands offer comfort and style, making them the perfect accessory for both casual and formal looks.",
            main_image:
              "https://images.unsplash.com/photo-1601544816113-5dd7c7a526b2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

            extra_images: [
              "https://images.unsplash.com/photo-1664292306682-d5c492192a40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Braclet",
            category: ["BRACLETS"],
            description:
              " Discover the artistry in our bracelet selection, where modern simplicity meets intricate detailing, offering a versatile range to complement your personal style.",
            main_image:
              "https://images.unsplash.com/photo-1586878341523-7acb55eb8c12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8",

            extra_images: [
              "https://plus.unsplash.com/premium_photo-1671641737519-841d15b5211f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Braclets",
            category: ["BRACLETS"],
            description:
              " Discover the artistry in our bracelet selection, where modern simplicity meets intricate detailing, offering a versatile range to complement your personal style.",
            main_image:
              "https://images.unsplash.com/photo-1586878340506-af074f2ee999?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

            extra_images: [
              "https://images.unsplash.com/photo-1597006354775-2955b15ec026?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },

    ]
})
}
const createCustomers = async () => {
  const password1 = "1234";
  const password2 = "1234789";
  const password3 = "123489";

  const encryptedPassword1 = await bcrypt.hash(password1, 10);
  const encryptedPassword2 = await bcrypt.hash(password2, 10);
  const encryptedPassword3 = await bcrypt.hash(password3, 10);

  await prisma.user.createMany({
    data: [
      {
        fullname: "Hichem Sboui",
        email: "hichem@gmail.com",
        password: encryptedPassword1,
        role: "CUSTOMER",
        isVerified: true,
      },
      {
        fullname: "Abderrahmen Louhichi",
        email: "abderrahmen@gmail.com",
        password: encryptedPassword2,
        role: "CUSTOMER",
        isVerified: true,
      },
      {
        fullname: "Haithem Chaouch",
        email: "haithem@gmail.com",
        password: encryptedPassword3,
        role: "CUSTOMER",
        isVerified: true,
      },
      {
        fullname: "Hane Chaouch",
        email: "hanem@gmail.com",
        password: encryptedPassword3,
        role: "CUSTOMER",
        isVerified: true,
      },
      {
        fullname: "Hiba hndaoui",
        email: "hiba@gmail.com",
        password: encryptedPassword3,
        role: "CUSTOMER",
        isVerified: true,
      },
      {
        fullname: "Hlima meskni",
        email: "hlima@gmail.com",
        password: encryptedPassword3,
        role: "CUSTOMER",
        isVerified: true,
      },
      {
        fullname: "Hassen werghi",
        email: "hassenm@gmail.com",
        password: encryptedPassword3,
        role: "CUSTOMER",
        isVerified: true,
      },
      {
        fullname: "zied arfaoui",
        email: "zied@gmail.com",
        password: encryptedPassword3,
        role: "CUSTOMER",
        isVerified: true,
      },
    ]
  })
}

const createTags =async ()=>{
  const categories = [
    { id: '1', name: 'New Arrivals', image: "nude.jpg" },
    { id: '2', name: 'Best Sellers', image: "pink.jpg" },
    { id: '3', name: 'Rings', image: "rings.jpg" },
    { id: '4', name: 'Necklaces', image: 'necklaces.jpg' },
    { id: '5', name: 'Earrings', image: "earr.jpg" },
    { id: '6', name: 'Bracelets', image: "braclets.jpg" },
    { id: '7', name: 'Hair Clips', image:"bands.jpg" },
    { id: '8', name: 'Brooches', image: "Broches.jpg" },
  ];
  const tagData = categories.map(category => ({
    id:parseInt(category.id),
    name: category.name,
    image: `static/${category.image}`
  }));
  await prisma.tag.createMany({
    data: tagData,
  });
  console.log('Tags created successfully.');
}
//createCustomers()
//createJewelries()
createTags()
