import { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import { CardContainer } from "./style";
import { Link } from "react-router-dom";
class CardMovie extends Component {
  render() {
    const { cardData } = this.props;

    return (
      <CardContainer>
        <div>
          {cardData &&
            cardData.map((item) => {
              return (
                <div>
                  <Card style={{ maxWidth: 400 }}>
                    <Link to={item.url} style={{ color: "black" }}>
                      <CardActionArea>
                        <CardMedia
                          image={item.image_url}
                          title={item.title}
                          style={{
                            height: 0,
                            paddingTop: "56%",
                            marginTop: "30",
                          }}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.title}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                  <br />
                </div>
              );
            })}
        </div>
      </CardContainer>
    );
  }
}

export default CardMovie;
