import {connect} from 'react-redux'
import { setIngredientInstructionCombo } from '../actions'
import { Label, List, } from 'semantic-ui-react'
import React from 'react'


const GraphTop = ({name, topThree, action, clicked, addCombo}) => {
    return (
    <List>
      <List.Item>{name}</List.Item>
    {topThree.map((item, i) => {
      let pair = {ingredient: action? item : name, action: action? name: item},
      highlight= false;
      if(clicked) highlight = clicked.ingredient == pair.ingredient && clicked.action == pair.action
      return(<List.Item style={{cursor: 'pointer'}} onClick={() => addCombo(action, pair)} key={i}><Label size='mini' basic={highlight}>{item}</Label></List.Item>);
      })
    }
    </List>
  )};

const mapStateToProps = (state) => ({
    IngredientCombos: state.clusters.IngredientCombos,
    InstructionCombos: state.clusters.InstructionCombos
 });
 
 const mapDispatchToProps = (dispatch) => ({
     addCombo: (action, ingredient_instruction) =>  dispatch(setIngredientInstructionCombo(action, ingredient_instruction)),
     
   });
   
   const TopThreeClickable = connect(
       mapStateToProps,
       mapDispatchToProps,
   )(GraphTop)
   
   export default TopThreeClickable;

