namespace $ {
	
	export class $hyoo_crus_realm extends $mol_object {
		
		lords = new $mol_wire_dict< string, $hyoo_crus_lord >()
		
		home() {
			return this.Lord( this.$.$hyoo_crus_auth.current().lord() )
		}
		
		@ $mol_mem_key
		Lord( numb: string ) {
			
//			this.$.$mol_wait_timeout(1000)
			
			let lord = this.lords.get( numb )
			if( lord ) return lord
			
			lord = $hyoo_crus_lord.make({
				realm: $mol_const( this ),
				numb: $mol_const( numb ),
			})
			
			this.lords.set( numb, lord )
			return lord
			
		}
		
		Land( guid: string ) {
			return this.Lord( guid.slice( 0, 16 ) ).Land( guid.slice( 16, 24 ) )
		}
		
		Node< Node extends typeof $hyoo_crus_node > ( Node: Node, guid: string ) {
			return this.Land( guid.slice( 0, 24 ) ).Node( Node ).Item( guid.slice( 24, 32 ) )
		}
		
		// @ $mol_mem_key
		// key_public( lord: bigint ) {
		// 	const key = this.Land( lord ).Area( 0 ).pass.get( Number( lord >> 16n ) )?.auth()
		// 	return key ? $mol_crypto_key_public.from( key ) : null
		// }
		
		// @ $mol_mem_key
		// secret_mutual( dest: bigint ) {
			
		// 	const key = this.key_public( dest )
		// 	if( !key ) return null
			
		// 	return $mol_wire_sync( $mol_crypto_secret ).derive(
		// 		this.$.$hyoo_crus_auth.current().toString(),
		// 		key.toString(),
		// 	)
			
		// }
		
	}
	
}
