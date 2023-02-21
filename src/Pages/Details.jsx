import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../CartContext";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import ImageCard from "../Components/ImageCard";
import Loader from "../Components/Loader";
import ColorModal from "../Components/ColorModal";
const Details = () => {
  axios.defaults.withCredentials = true;
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [colorModal, setColorModal] = useState(false);
  const [mobile, setMobile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectColor, setSelectColor] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  useEffect(() => {
    const getproducts = async () => {
      try {
        const res = await axios.get(
          `https://alphaapi-production.up.railway.app/alphaapi/product/${id}`
        );
        setProducts([res.data]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getproducts();

    const getColor = async () => {
      try {
        const res = await axios.get(
          `https://alphaapi-production.up.railway.app/alphaapi/color/${id}`
        );
        setColors(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getColor();
  }, [id]);

  const handleMobile = () => {
    setMobile(!mobile);
  };
  const handleModal = () => {
    setModal(!modal);
  };

  const openModal = () => {
    setColorModal(!colorModal);
  };

  const handleClick = (size, item) => {
    setSelectedSizes({ ...selectedSizes, [item._id]: size });
    addToCart({ ...item, size });
  };

  const handleColorUpdate = (color) => {
    setSelectColor(color);
  };

  console.log(selectColor);

  if (loading) return <Loader />;
  return (
    <>
      <Header handleModal={handleModal} handleMobile={handleMobile} />
      <main className="main">
        <section className="section detailss">
          <div className="wrapper">
            <div className="boxes">
              <div className="mobile-center">
                {products.map((item, i) => {
                  return (
                    <div className="box" key={item._id}>
                      <div className="product-image">
                        {selectColor.length > 0 ? (
                          <img src={selectColor} alt={selectColor} />
                        ) : (
                          item.image.map((img, i) => {
                            return <img src={img.url} alt={img.url} />;
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {user && user.isAdmin ? (
          <>
            {products.map((item, i) => {
              return (
                <div className="row-sections">
                  <section className="details">
                    <div className="bottom-wrapper">
                      <div className="top">
                        <div className="left">
                          <h3 className="heading">{item.name}</h3>
                          <p className="paragraph">{item.desc}</p>
                          <small>{item.category}</small>
                          <small>{item.colorName}</small>
                        </div>
                        <div className="right">
                          <h3 className="heading red">${item.price}</h3>
                        </div>
                      </div>

                      <div className="row-top">
                        <div className="color-box">
                          <h3 className="heading">
                            {colors && colors.length} color (s) |{" "}
                            {item.colorName}
                          </h3>
                          <div className="color-rounds">
                            {colors.map((color, i) => {
                              return (
                                <div className="color-image">
                                  {color.image.map((img, i) => {
                                    return (
                                      <img
                                        src={img.url}
                                        alt={img.url}
                                        onClick={() =>
                                          handleColorUpdate(img.url)
                                        }
                                      />
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="sizes-box">
                          <div className="top">
                            <h3 className="heading">Size</h3>
                          </div>

                          <div className="size-box">
                            {item.sizes.map((size, i) => {
                              return (
                                <div className="size">
                                  <small>{size}</small>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="desc-box">
                        <div className="description">
                          <div className="desc-top">
                            <h3 className="heading">Description</h3>
                            <h3 className="heading">+</h3>
                          </div>

                          <div className="desc-bottom">
                            <p className="paragraph">{item.desc}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="addbtn"
                        onClick={openModal}
                      >
                        Upload Colors
                      </button>
                    </div>
                  </section>
                </div>
              );
            })}

            {products.map((item, i) => {
              return (
                <div className="desktop-details">
                  <div className="desktop-details-top">
                    <div className="grid-top">
                      <div className="top">
                        <div className="left">
                          <h3 className="heading">{item.name}</h3>
                          <p className="paragraph">{item.desc}</p>
                          <small>{item.category}</small>
                          <small>{item.colorName}</small>
                        </div>
                        <div className="right">
                          <h3 className="heading red">${item.price}</h3>
                        </div>
                      </div>

                      <div className="center">
                        {products.map((item, i) => {
                          return (
                            <div className="box" key={item._id}>
                              <div className="product-image">
                                {selectColor.length > 0 ? (
                                  <img src={selectColor} alt={selectColor} />
                                ) : (
                                  item.image.map((img, i) => {
                                    return <img src={img.url} alt={img.url} />;
                                  })
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="right">
                        <div className="row-top">
                          <div className="color-box">
                            <h3 className="heading">
                              {colors && colors.length} color (s) |{" "}
                              {item.colorName}
                            </h3>
                            <div className="color-rounds">
                              {colors.map((color, i) => {
                                return (
                                  <div className="color-image">
                                    {color.image.map((img, i) => {
                                      return (
                                        <img
                                          src={img.url}
                                          alt={img.url}
                                          onClick={() =>
                                            handleColorUpdate(img.url)
                                          }
                                        />
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="sizes-box">
                            <div className="top">
                              <h3 className="heading">Size</h3>
                            </div>

                            <div className="size-box">
                              {item.sizes.map((size, i) => {
                                return (
                                  <div className="size">
                                    <small>{size}</small>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="addbtn"
                          onClick={openModal}
                        >
                          Upload Colors
                        </button>
                      </div>
                    </div>

                    <div className="grid-bottom">
                      <span>
                        <div className="top">
                          <p className="paragraph">{item.desc}</p>
                        </div>

                        <div className="bottom">
                          <h3 className="heading">Description</h3>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div className="row-sections">
              <section className="details">
                {products.map((item, i) => {
                  return (
                    <div className="bottom-wrapper">
                      <div className="top">
                        <div className="left">
                          <h3 className="heading">{item.name}</h3>
                          <p className="paragraph">{item.desc}</p>
                          <small>{item.category}</small>
                          <small>{item.colorName}</small>
                        </div>
                        <div className="right">
                          <h3 className="heading red">${item.price}</h3>
                        </div>
                      </div>

                      <div className="row-top">
                        <div className="color-box">
                          <h3 className="heading">
                            {colors && colors.length} color (s) |{" "}
                            {item.colorName}
                          </h3>
                          <div className="color-rounds">
                            {colors.map((color, i) => {
                              return (
                                <div className="color-image">
                                  {color.image.map((img, i) => {
                                    return (
                                      <img
                                        src={img.url}
                                        alt={img.url}
                                        onClick={() =>
                                          handleColorUpdate(img.url)
                                        }
                                      />
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="sizes-box">
                          <div className="top">
                            <h3 className="heading">Select Size</h3>
                          </div>

                          <div className="size-box">
                            {item.sizes.map((size, i) => {
                              return (
                                <div
                                  className="size"
                                  onClick={() => handleClick(size, item)}
                                >
                                  <small>{size}</small>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="desc-box">
                        <div className="description">
                          <div className="desc-top">
                            <h3 className="heading">Description</h3>
                            <h3 className="heading">+</h3>
                          </div>

                          <div className="desc-bottom">
                            <p className="paragraph">{item.desc}</p>
                          </div>
                        </div>
                      </div>

                      <button className="sizebtn">Select Size</button>
                      <button className="addbtn">Add to bag</button>
                    </div>
                  );
                })}
              </section>

              <section className="section new details-page">
                <div className="wrapper">
                  <div className="area">
                    <h3 className="heading">You May Also Like</h3>
                  </div>
                  <div className="boxes">
                    <ImageCard />
                  </div>
                </div>
              </section>
            </div>

            {products.map((item, i) => {
              return (
                <div className="desktop-details">
                  <div className="desktop-details-top">
                    <div className="grid-top">
                      <div className="top">
                        <div className="left">
                          <h3 className="heading">{item.name}</h3>
                          <p className="paragraph">{item.desc}</p>
                          <small>{item.category}</small>
                          <small>{item.colorName}</small>
                        </div>
                        <div className="right">
                          <h3 className="heading red">${item.price}</h3>
                        </div>
                      </div>

                      <div className="center">
                        {products.map((item, i) => {
                          return (
                            <div className="box" key={item._id}>
                              <div className="product-image">
                                {selectColor.length > 0 ? (
                                  <img src={selectColor} alt={selectColor} />
                                ) : (
                                  item.image.map((img, i) => {
                                    return <img src={img.url} alt={img.url} />;
                                  })
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="right">
                        <div className="color-box">
                          <h3 className="heading">
                            {colors && colors.length} color (s) |{" "}
                            {item.colorName}
                          </h3>
                          <div className="color-rounds">
                            {colors.map((color, i) => {
                              return (
                                <div className="color-image">
                                  {color.image.map((img, i) => {
                                    return (
                                      <img
                                        src={img.url}
                                        alt={img.url}
                                        onClick={() =>
                                          handleColorUpdate(img.url)
                                        }
                                      />
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="sizes-box">
                          <div className="top">
                            <h3 className="heading">Select Size</h3>
                          </div>

                          <div className="size-box">
                            {item.sizes.map((size, i) => {
                              return (
                                <div
                                  className="size"
                                  onClick={() => handleClick(size, item)}
                                >
                                  <small>{size}</small>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <button className="sizebtn">Select Size</button>
                        <button className="addbtn">Add to bag</button>
                      </div>
                    </div>

                    <div className="grid-bottom">
                      <span>
                        <div className="top">
                          <p className="paragraph">{item.desc}</p>
                        </div>

                        <div className="bottom">
                          <h3 className="heading">Description</h3>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <section className="section new details-page desktop-details-page">
              <div className="wrapper">
                <div className="area">
                  <h3 className="heading">You May Also Like</h3>
                </div>
                <div className="boxes">
                  <ImageCard />
                </div>
              </div>
            </section>
          </>
        )}

        <ColorModal openModal={openModal} colorModal={colorModal} />
        <Modal modal={modal} handleModal={handleModal} />
        <MobileNav mobile={mobile} handleMobile={handleMobile} />
      </main>
      <Footer />
    </>
  );
};

export default Details;
