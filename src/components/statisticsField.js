import React from 'react'
// import { LabelField } from "./labeled"
import Plot from "./charts/GraphPlot"
import { Card, Icon, Table,  Label, List, Popup, Loader, Grid, Item} from 'semantic-ui-react'


const GraphTop = ({name, topThree}) => {
  return (
  <List>
    <List.Item>{name}</List.Item>
  {topThree.map((item, i) => <List.Item style={{cursor: 'pointer'}} key={i}><Label size='mini'>{item}</Label></List.Item>)}
  </List>
)};

class GraphCard extends React.Component {
  render(){
    let name = this.props.action? this.props.action : this.props.ingredient;
    return(      
      <Item>
        <Item.Description>
          <GraphTop topThree={this.props.neighbors} name={name} />
        </Item.Description>
        <Item.Content>
          <Plot data={this.props.histogram} width={200} height={120} colors={this.props.colors}/>
        </Item.Content>
      </Item>
    );
  }
}

const TableHeader = () => (
  <Grid.Row>
      <Grid.Column>Instruction is added : </Grid.Column>
      <Grid.Column>Ingredient Adding Time : </Grid.Column>
  </Grid.Row>
);

export class StatRow extends React.Component {

  state = {loading: true}
  histograms = {}

  constructor(){
    super();
  }

  componentDidMount() {
    this.props.histogram.then(d=>
      {
        this.setState({histograms: d})
        this.setState({loading: false})
      
    })
  }

  render(){
    return (
      <div>
        <h2>
          Recipe Analysis
          <Popup
            trigger={<Icon color="grey" size="tiny" name="question circle" />}
            content="I don't know what to put here"
          />
        </h2>
              {this.state.loading?
                <Loader active size='large'>Loading</Loader>
              :
              <div className={"RecipeMap"}>
              <Grid container columns={'equal'}  celled>
          <TableHeader />
              <Grid.Row verticalAlign='top'>
                <Grid.Column>
                  <div className={"Stats"}>
                  <Item.Group divided>
                    {this.state.histograms.actions.map((methodCard, index) => <GraphCard {...methodCard} key={index} colors={this.props.colors}/>)}
                  </Item.Group>
                  </div>
                  
                </Grid.Column>
                <Grid.Column>
                  <div className={"Stats"}>
                    <Item.Group divided>
                    {this.state.histograms.ingredients.map((ingredientCard, index) => <GraphCard {...ingredientCard} key={index} colors={this.props.colors}/>)}
                    </Item.Group>
                  </div>
                </Grid.Column>
              </Grid.Row>
        </Grid>
        </div>
        }
      </div>
    );
  }
}
