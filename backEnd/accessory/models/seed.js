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
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpjTmsEU1vx_oadxoz7ZW9-gnNTLGvkliizq7tXkRy213BfAx1",
        
          extra_images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpjTmsEU1vx_oadxoz7ZW9-gnNTLGvkliizq7tXkRy213BfAx1",
            "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTIy9pgALl_jSCt3OPKkymJW3mBrV8i3OhSx1JD9NYFwqh02Ino",
          ],

          status: "Available",
          price:6,
         
          createdAt: new Date("2023-06-05").toISOString(),
        },
        {
            name: "Earing",
            category: ["EARINGS"],
            description:
              "Express your individuality with our diverse earring collection, ranging from classic studs to bold hoops and elegant dangles, enhancing every outfit with finesse.",
            main_image:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSbeU621aXdj5LLoi6HKqFLSvxE859oDWYCTJBsGQple6Md6awt",
          
            extra_images: [
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSbeU621aXdj5LLoi6HKqFLSvxE859oDWYCTJBsGQple6Md6awt",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQbhO4vDu2o6ilo5WyhYcLUTZ4E9F7Sb2QRg_uvsWPuaq1jGq7B",
            ],

            status: "Available",
            price:8,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "Cup",
            category: ["OTHERS"],
            description:
              " colors :Pink,beige and black",
            main_image:
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSxSBzXPTxkdkA2n5n7g2_zdy-q-2P5NCd8jQv2gbksLQQtmOLQ",
          
            extra_images: [
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSxSBzXPTxkdkA2n5n7g2_zdy-q-2P5NCd8jQv2gbksLQQtmOLQ",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ2OLlbisw2I4yAKWd7drIUT5Mhp4POeXDeLwcl1P11khAuYKjG",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS_FOad9v_aieVP6W_T6nwjQKhDWs0oqtpZBY5Pr2hCJ62sHMdk",
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
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRbpYgxEp24lZ7N-IiodUYOfn9gKcnDXeMjmMgQlPpWYv20B9pm",
          
            extra_images: [
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRbpYgxEp24lZ7N-IiodUYOfn9gKcnDXeMjmMgQlPpWYv20B9pm",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRKeXSnRaKQ5lKA_d-JeUVuF-xMFptTxZqWdqHROJHc8h5KIZVP",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRl3A5fX3bN7Y3iThLo0avJIiRLs_9GJKJ4BSl4SoMezRVVv-sK"
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
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRPqSAJaSTKVkLHtPjjfv5boETyp4730d_gkItsm83-rXq52gXI",
          
            extra_images: [
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRPqSAJaSTKVkLHtPjjfv5boETyp4730d_gkItsm83-rXq52gXI",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRPqSAJaSTKVkLHtPjjfv5boETyp4730d_gkItsm83-rXq52gXI",
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
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQcrkrcOq3fXaLDbQEecp0cSODq0vQJgK2AwR5hvVzI72yt_FRx",
          
            extra_images: [
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQcrkrcOq3fXaLDbQEecp0cSODq0vQJgK2AwR5hvVzI72yt_FRx",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR3en7RoSa2ajQow1jzmMTZQzCjN8EF2u3PdNvY1TPYCiNZQP1s",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSV_V8xgYiHv5T68Ljc2li8R07CuILSAomOWNCLhZi6-a7gIph9",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIkOd_02UY44ufwbGq27duwntiVGYEHHZS8m-I8qcFhMVMubw0"           
        ],           
            status: "Available",
            price:8,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },     {
            name: "Sunglass",
            category: ["OTHERS"],
            description:
              "Elevate your hair game with our chic and functional SUNGLASSES, crafted to add flair and sophistication to your everyday hairstyles effortlessly.",
            main_image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSun21F7CSnmdX2UbAdT4kSYWQ4JfQXLcTshH22ZswJ052O8ZSB",
          
            extra_images: [
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSun21F7CSnmdX2UbAdT4kSYWQ4JfQXLcTshH22ZswJ052O8ZSB",
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRfTfCN6f6BCAxxMmj8_icJ6Q4UPWnHrlT51KO6iQbV-DQ5UuL0",
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
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQCAbYkdESuGuI90b0Tnw1LaOBavf_aPP1Du_26Hax1ssEml0wm",
          
            extra_images: [
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQCAbYkdESuGuI90b0Tnw1LaOBavf_aPP1Du_26Hax1ssEml0wm",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSOlhTLX7OR7Z5AEnrcbKx_B36MhQCLTrAaFSsuhlhT9aIhGqVH",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLSDT__csXFKAiBj6VymaTe9ulcH3XWN3xAq4YY9arMU2s8Nnf"
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "earings",
            category: ["EARINGS"],
            description:
              " From sleek and simple designs to vibrant patterns, our hair bands offer comfort and style, making them the perfect accessory for both casual and formal looks.",
            main_image:
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTtjQtzc_XCuK2I_dMikVPt-G9phImGo-kD6_AWnfHmcTIXdiRb",
          
            extra_images: [
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTtjQtzc_XCuK2I_dMikVPt-G9phImGo-kD6_AWnfHmcTIXdiRb",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2HdRrah_7_oY2va6kilb61FJOPKkz6hMZCM96qttFrFtfQzcL",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRE0NkHykNJ7BOwONOKsoFx2ncIQlygdwB-TctYsmoAKDNuixx5"
            ],

            status: "Available",
            price:12,

            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "earings",
            category: ["EARINGS"],
            description:
              " Discover the artistry in our bracelet selection, where modern simplicity meets intricate detailing, offering a versatile range to complement your personal style.",
            main_image:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTa3orWwl-J4QMHHiUMQY7M67NiVQMtR4YfhIiP00nwj5PsQ61t",
          
            extra_images: [
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTa3orWwl-J4QMHHiUMQY7M67NiVQMtR4YfhIiP00nwj5PsQ61t",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ32fC_V3KPFDzh9ST4Xk-8JKs2q2N_3YS-diB456NK5RRHxcsq",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTXEfgRXR1XUewQ-w1I9nB-MEE2S4ucLHO0cptlqqh81vqNRuK-"
            ],

            status: "Available",
            price:6,
           
            createdAt: new Date("2023-06-05").toISOString(),
          },
          {
            name: "earing",
            category: ["EARINGS"],
            description:
              " Discover the artistry in our EARINGS selection, where modern simplicity meets intricate detailing, offering a versatile range to complement your personal style.",
            main_image:
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRFkC-hbjUhqB8Yop0bpt8X7VHy_kHZf5nlKym9H3TP5elArGRY",
          
            extra_images: [
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRFkC-hbjUhqB8Yop0bpt8X7VHy_kHZf5nlKym9H3TP5elArGRY",
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVBtrYezePQ3Soe7inoqDxrPiiDZEcZs-Arma-hFfRsZ2BNPT1",
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBL0LqdIX3P5NmUU9gdwFW3vl-se_66iPD5wiw7YgF3PfVKyeL"
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
//createJewelries()
createTags()
