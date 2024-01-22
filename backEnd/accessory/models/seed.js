const prisma = require("./index");
const bcrypt = require("bcrypt");


const createJewelries = async () => {
    await prisma.jewelry.createMany({
      data: [
        {
          name:"blue Ring",
          category:["RINGS"],
          description:
            "Express your individuality with our diverse earring collection, ranging from classic studs to bold hoops and elegant dangles, enhancing every outfit with finesse.",
          main_image:
            "https://ae01.alicdn.com/kf/S4f8608b9c03f4818b6e8f0fdc94a8af09/Bague-g-om-trique-ajustable-pour-femmes-anneau-d-ouverture-bijoux-cadeau-Vintage-vert-bleu.jpg_.webp",
        
          extra_images: [
            "https://ae01.alicdn.com/kf/S25b169091cf2413c91bf83bce3a3b8d5k/Bague-g-om-trique-ajustable-pour-femmes-anneau-d-ouverture-bijoux-cadeau-Vintage-vert-bleu.jpg_.webp",
          ],

          status: "Available",
          price:6,
         
          createdAt: new Date("2023-06-05").toISOString(),
        },
        {
            name: " Gold Earing",
            category: ["EARINGS"],
            description:
              "Express your individuality with our diverse earring collection, ranging from classic studs to bold hoops and elegant dangles, enhancing every outfit with finesse.",
            main_image:
              "https://img.ltwebstatic.com/images3_spmp/2023/06/25/1687685436ed712afb3db36e349849ed8cb9015c49_thumbnail_900x.jpg",
          
            extra_images: [
              "https://images.asos-media.com/products/monki-hazel-grosses-creoles-dore/22521862-1-gold?$n_480w$&wid=476&fit=constrain",
            ],

            status: "Available",
            price:8,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: " purple Earing",
            category: ["EARINGS"],
            description:
              "Express your individuality with our diverse earring collection,purple or pink ",
            main_image:
              "https://img.ltwebstatic.com/images3_pi/2020/12/21/16085314767efa84ed67db58e057193819a25660a6_thumbnail_900x.jpg",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_pi/2020/12/21/1608531483a4be0b54d0d44b40825313938ca43983.webp",
              "https://img.ltwebstatic.com/images3_spmp/2023/05/29/1685354137f8d4784942d203ce1bb8a1a58ab9f140.webp"
            ],

            status: "Available",
            price:12,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: " cloud Earing",
            category: ["EARINGS"],
            description:
              "Express your individuality with our diverse earring collection,purple or pink ",
            main_image:
              "https://img.ltwebstatic.com/images3_pi/2023/03/13/16786881713a2e261522b56d969bfb5a25b4d3c756_thumbnail_900x.jpg",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_spmp/2023/05/11/1683789432e3280bde55aa8e25dc1d11566bdbea41_thumbnail_900x.jpg",
             
            ],

            status: "Available",
            price:12,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: " green earings ",
            category: ["EARINGS"],
            description:
              "Express your individuality with our diverse earring collection,purple or pink ",
            main_image:
              "https://img.ltwebstatic.com/images3_pi/2021/08/02/1627895767ba68d8e3a2361aa9197adbe361e9a982_thumbnail_900x.jpg",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_pi/2021/08/02/1627895775724e3e0eab299d1cd5e6934d6f528f20_thumbnail_900x.jpg",
             
            ],

            status: "Available",
            price:12,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Cup",
            category: ["OTHERS"],
            description:
              " colors :Pink,beige and black",
            main_image:
              "https://img.ltwebstatic.com/images3_spmp/2023/09/11/78/1694418321751d0542a876a5f65cb75cf146fe74cf_thumbnail_900x.jpg",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_spmp/2023/10/12/d0/1697102233745f153e00bbcf508d0d806ce769bd1f_thumbnail_900x.jpg",
              "https://img.ltwebstatic.com/images3_spmp/2023/09/12/54/1694486753b80d24c6b601e158d6eab85e9d9d7b0c.webp",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "double chain ",
            category: ["NECKLACES"],
            description:
              " Embrace elegance with our diverse range of necklaces, featuring timeless pendants, delicate chains, and intricate designs that add a touch of sophistication to any ensemble.",
            main_image:
              "https://img.ltwebstatic.com/images3_pi/2021/06/22/1624343729438998307e1784fb4519a26b14db1c55_thumbnail_900x.jpg",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_pi/2021/06/22/1624343724de439e581a3912d7943e7d60c5874f1f_thumbnail_900x.jpg",
           
            ],

            status: "Available",
            price:10,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "big gold chain ",
            category: ["NECKLACES"],
            description:
              " Embrace elegance with our diverse range of necklaces, featuring timeless pendants, delicate chains, and intricate designs that add a touch of sophistication to any ensemble.",
            main_image:
              "https://img.ltwebstatic.com/images3_spmp/2023/09/07/56/1694095758a47dca093ba92857d5c21df28ee5a98b_thumbnail_900x.jpg",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_spmp/2023/09/10/8d/16943216422ac7bccf2fdd344c40ac08d3b7df105b_thumbnail_900x.jpg",
           
            ],

            status: "Available",
            price:10,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Rings",
            category: ["RINGS"],
            description:
              "Effortlessly elevate your style with our exquisite collection of rings, from minimalist bands to statement gemstone pieces, perfect for every occasion.",
            main_image:
              "https://img.ltwebstatic.com/images3_spmp/2023/07/21/1689904169af7458c11bca1640f641f0fbb86c1adc.webp",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_spmp/2023/07/21/168990418020aa6ea6c077201434e7caf2ee6d8035.webp",
            ],

            status: "Available",
            price:8,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Ring",
            category: ["RINGS"],
            description:
              "Effortlessly elevate your style with our exquisite collection of rings, from minimalist bands to statement gemstone pieces, perfect for every occasion.",
            main_image:
              "https://img.ltwebstatic.com/images3_pi/2023/01/13/16735897738131a1ceac5049ee31edc7325779b299_thumbnail_900x.webp",
          
            extra_images: [
              "https://youby.me/cdn/shop/files/IMG-1786_470x509_crop_top.jpg?v=1694593534",
              "https://img.ltwebstatic.com/images3_pi/2023/01/13/167358977570fe6ec14859c2c0b47e67ccad3f4c43_thumbnail_900x.jpg",
                       
        ],           
            status: "Available",
            price:8,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },  
          {
            name: " set of Ring",
            category: ["RINGS"],
            description:
              "Effortlessly elevate your style with our exquisite collection of rings, from minimalist bands to statement gemstone pieces, perfect for every occasion.",
            main_image:
              "https://img.ltwebstatic.com/images3_pi/2023/03/26/16798385842a812c11c00dca9323e8ead702bb149a_thumbnail_900x.jpg",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_pi/2023/03/26/1679838582b983752e69d1dd81b6e955d3d09b66fc_thumbnail_900x.jpg",
             
                       
        ],           
            status: "Available",
            price:8,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },   
          {
            name: " green Rings",
            category: ["RINGS"],
            description:
              "Effortlessly elevate your style with our exquisite collection of rings, from minimalist bands to statement gemstone pieces, perfect for every occasion.",
            main_image:
              "https://img.ltwebstatic.com/images3_spmp/2023/10/27/ab/16983910409254f78e1416b3527be1f64f26a8219d_thumbnail_900x.jpg",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_spmp/2023/10/27/64/1698390858689eb17dab95abbffdc087bbb7be428f_square_thumbnail_900x.jpg",
             
                       
        ],           
            status: "Available",
            price:8,
           
            createdAt: new Date("2023-06-05").toISOString(),
          }, 
          {
            name: "Sunglass",
            category: ["OTHERS"],
            description:
              "Elevate your hair game with our chic and functional SUNGLASSES, crafted to add flair and sophistication to your everyday hairstyles effortlessly.",
            main_image:
              "https://img.ltwebstatic.com/images3_spmp/2024/01/16/44/1705375503ec1948508cf14028bc83b5e4d804fba3_thumbnail_900x.webp",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_spmp/2023/09/01/ed/1693554699e359f3f1225237ea6d9f6910e0b0d7ca_thumbnail_900x.jpg",
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },     {
            name: "braclets",
            category: ["BRACLETS"],
            description:
              "Elevate your hair game with our chic and functional hair clips, crafted to add flair and sophistication to your everyday hairstyles effortlessly.",
            main_image:
              "https://img.ltwebstatic.com/images3_spmp/2023/12/02/b5/17015019470244220c3aee9bb2d8591d12ee2096dd.webp",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_spmp/2023/12/02/91/170150193642de41b1eb0ba7fa724e787267076977_thumbnail_900x.jpg",
              "https://img.ltwebstatic.com/images3_spmp/2023/12/02/0c/1701501935038673d3c676ceb015543385aaf095a0_thumbnail_900x.jpg"
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "glitter earing",
            category: ["EARINGS"],
            description:
              " From sleek and simple designs to vibrant patterns, our hair bands offer comfort and style, making them the perfect accessory for both casual and formal looks.",
            main_image:
              "https://ae01.alicdn.com/kf/S4d2a671cf4f14bb4b627c4ea6ff562d4Z/-.jpg",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_spmp/2023/09/26/1f/1695712308b21dd40d35da291d589d431eb5bfa57e_square_thumbnail_900x.jpg",
              "https://ae01.alicdn.com/kf/S7faba80be55f40f3b583183d10ac33404/Boucles-d-Oreilles-Dor-es-en-Acier-Inoxydable-Plaqu-Or-18k-Bijoux-en-Forme-de-Goutte.jpg_.webp"
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: " circle earing",
            category: ["EARINGS"],
            description:
              " Discover the artistry in our bracelet selection, where modern simplicity meets intricate detailing, offering a versatile range to complement your personal style.",
            main_image:
              "https://img.ltwebstatic.com/images3_spmp/2023/12/03/13/170160916759de47ed2edc962dc7219e32859c9b1b.webp",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_spmp/2023/11/23/0a/1700736200bb6393e87323a8cc263e3524bd37116e.webp",
              "https://ae01.alicdn.com/kf/S07e2975f791e4f0db5bd8aa0d3ea79b0P/Boucles-d-oreilles-en-m-tal-lisse-plaqu-or-vintage-pour-femmes-boucles-d-oreilles-goutte.jpg_.webp"
            ],

            status: "Available",
            price:6,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: " sunflower earing",
            category: ["EARINGS"],
            description:
              " Discover the artistry in our EARINGS selection, where modern simplicity meets intricate detailing, offering a versatile range to complement your personal style.",
            main_image:
              "https://img.ltwebstatic.com/images3_spmp/2023/06/17/1686968268196167569935fdd95864278994b67abc_thumbnail_900x.jpg",
          
            extra_images: [
              "https://img.ltwebstatic.com/images3_spmp/2023/06/17/168696830367bdcf8d9c2cc5cac6f0f944c739720f_thumbnail_900x.jpg",
              "https://img.ltwebstatic.com/images3_spmp/2023/06/17/1686968342e1afe189bb0885369ca76b0957ab3f93_thumbnail_900x.jpg"
            ],

            status: "Available",
            price:8,
           
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
createJewelries()
//createTags()
