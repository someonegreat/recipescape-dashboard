import React from 'react'

class Element extends React.Component {
    render(){
        return (
            <td>{this.props.element}</td>
        );
    }
}

class Row extends React.Component {
    render(){
        return (
            <tr>
                <Element element={this.props.first}/>
                <Element element={this.props.second}/>
            </tr>
        );
    }
}

class RecipeCard extends React.Component {
    render(){
        let image, instructions;
        let ingredientTable = [];
        let sliceNbr = [6,4];
        if(this.props.image){
            image = <img src={this.props.image}/>;
            sliceNbr = [4,2];
        }
        let ingredients = this.props.ingredients.slice(0,sliceNbr[0]);
        for (var index = 0; index < ingredients.length; index= index+2) {
                ingredientTable.push(<Row first={ingredients[index]} second={ingredients[index+1]} key={ingredients[index]+ingredients[index+1]} />);
        }

        return(
            <div>
                <h4>{this.props.recipeName}</h4>
                {image}
                <h5>Ingredients</h5>
                    <table>
                        <tbody>
                        {ingredientTable}
                        </tbody>
                    </table>
                <h5>Instructions</h5>
                {this.props.instructions.slice(0,sliceNbr[1]).map(element => <p>{element}</p>)}
            </div>
        );
    }
}

class RecipeCards extends React.Component {
    render(){
        return(
            <div>
                {this.props.recipes.map((element, index) => <RecipeCard {...element}/>)}
            </div>
        );
    }
}

export class RecipeDeck extends React.Component {
    render(){
        return (
            <div style={{float: "left"}}>
                <h2>Recipe Deck</h2>
                <div>
                    <RecipeCards recipes={this.props.recipes}/>
                </div>
            </div>
        );
    }
}
