namespace $ {
	export class $hyoo_crus_base extends $hyoo_crus_dict {
		
		@ $mol_mem
		title( next?: string ) {
			return this.dive( 'title', $hyoo_crus_reg ).value_str( next )
		}
		
		@ $mol_mem
		selection( next?: readonly( readonly[ number, number ] )[] ) {
			return ( this.dive( 'selection', $hyoo_crus_reg ).value_vary( next ) ?? [ [ 0, 0 ], [ 0, 0 ] ] ) as readonly( readonly[ number, number ])[]
		}
		
		@ $mol_mem
		profiles() {
			return this.dive( 'profiles', $hyoo_crus_dict ).keys()
		}
		
		@ $mol_mem_key
		Profile( app: string ) {
			return this.dive( 'profiles', $hyoo_crus_dict ).dive( app, $hyoo_crus_reg ).yoke( app )
		}
		
	}
}
