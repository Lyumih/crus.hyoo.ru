namespace $ {
	export function $hyoo_crus_list_ref< Value extends any >( Value: Value ) {
			
		type Vals = $mol_type_result< $mol_type_result< Value > >[]
		
		class Narrow extends $hyoo_crus_list {
			
			static Value = Value
			
			static toJSON() {
				return '$hyoo_crus_list_ref(()=>' + ( Value as any )() + ')'
			}
			
			@ $mol_mem
			remote_list( next?: Vals ): Vals {
				const realm = this.realm()
				const Node = ( Value as any )()
				return this.items( next?.map( item => ( item as $hyoo_crus_node ).ref() ) )
					.map( $hyoo_crus_vary_cast_ref )
					.map( ref => realm!.Node( Node, ref ) )
			}
			
			@ $mol_action
			remote_make() {
				const land = this.realm()!.home().Land_new( 0 )
				this.splice([ land.ref() ])
				return land.Node( ( Value as any )() ).Item(0)
			}
			
		}
		
		return Narrow
	}
}
