import Node from './Node'
import { Color } from 'three'
import { default as r } from 'regexr'

const numberValue = r`^\s*${r.number}\s*$`
const integerTripletValue = r`^\s*${r.integer}\s+${r.integer}\s+${r.integer}\s*$`
const oneOrMoreSpaces = /\s+/g
const twoOrMoreSpaces = /\s\s+/g

// base class for light elements.
export default
class LightBase extends Node {

    static get observedAttributes() {
        return super.observedAttributes.concat([
            'color',
            'intensity',
        ])
    }

    construct(options = {}) {
        super.construct(options)
    }

    attributeChangedCallback( attr, oldVal, newVal ) {
        super.attributeChangedCallback( attr, oldVal, newVal )

        // TODO belongs in Light base class
        if ( attr == 'color' ) {

            // if a triplet space-separated of RGB numbers
            if ( newVal.match( integerTripletValue ) ) {
                newVal = newVal.trim().split( oneOrMoreSpaces ).map( n => parseFloat(n)/255 )
                this.threeObject3d.color = new Color( ...newVal )
            }
            // otherwise a CSS-style color string
            else {
                this.threeObject3d.color = new Color( newVal )
            }

            this._needsToBeRendered()

        }

        else if ( attr == 'intensity' ) {
            this.processNumberValue( attr, newVal )
            this._needsToBeRendered()
        }
    }

    processNumberValue( attr, value, context ) {
        context = context || this.threeObject3d
        const number = parseFloat( value )

        // TODO PERFORMANCE this check might be too heavy (users will hit this
        // every frame).
        if ( ! value.match( numberValue ) ) {

            console.warn( (
                `The value for the "${ attr }" attribute should be a
                number. It will be passed to window.parseFloat. Your value
                ("${ value }") will be converted to the number ${ number }.`
            ).replace( twoOrMoreSpaces, ' ' ) )

        }

        context[ attr ] = number
    }
}
