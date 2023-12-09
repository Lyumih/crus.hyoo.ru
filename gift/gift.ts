namespace $ {
	
	export class $hyoo_cras_gift extends $hyoo_cras_unit {
		
		rang( next?: $hyoo_cras_rang ) {
			
			if( next !== undefined ) this.uint8( 0, $hyoo_cras_unit_kind.gift )
			next = this.uint8( 1, next )
			
			if( next < $hyoo_cras_rang.get || next > $hyoo_cras_rang.law ) {
				$mol_fail( new RangeError( `Wrong rang ${ next }` ) )
			}
			
			return next
		}
		
		time( next?: number ) {
			return this.uint48( 8, next )
		}
		
		free() {
			return new Uint8Array( this.buffer, this.byteOffset + 14, 18 )
		}
		
		dest( next?: bigint ) {
			if( next !== undefined ) {
				this.uint32( 52, Number( next & 0xFFFFFFFFn ) )
				this.uint64( 56, next >> 32n )
			}
			return BigInt( this.uint32( 52 ) ) + ( this.uint64( 56 ) << 32n )
		}
		
		bill() {
			return new Uint8Array( this.buffer, this.byteOffset + 32, 20 )
		}
		
		tail() {
			return new Uint8Array( this.buffer, this.byteOffset + 42, 4 )
		}
		
		static compare(
			left: $hyoo_cras_gift,
			right: $hyoo_cras_gift,
		) {
			return ( right.time() - left.time() ) || ( right.peer() - left.peer() )
		}
		
		[ $mol_dev_format_head ]() {
			return $mol_dev_format_span( {} ,
				$mol_dev_format_native( this ) ,
				' ',
				this.peer().toString(16) ,
				' 🏅 ',
				$mol_dev_format_accent( $hyoo_cras_rang[ this.rang() ] ) ,
				' ',
				this.dest().toString(16),
				' ',
				$mol_dev_format_shade( new Date( this.time() ) ) ,
			)
		}
		
	}
	
}
