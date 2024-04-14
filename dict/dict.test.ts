namespace $.$$ {
	
	const auth1 = $hyoo_crus_auth.from( '_4eLnQsSr5wj6XOzgS5bZa254pkEOf_hg1nReCSR4Zkd-E07aLSwj-II-rZt4ZubInw_f1rZiA0Qa92qR0Gq3I6xYWCkW9Aagc7-97L2P-gI84NaLwdabp_DrZEX3RJTY' )
	
	$mol_test({
		
		async 'Dictionary invariants'( $ ) {
			
			const land = $hyoo_crus_land.make({ $ })
			const dict = land.Node( $hyoo_crus_dict ).Item('')
			$mol_assert_equal( dict.keys(), [] )
			
			dict.dive( 123, $hyoo_crus_atom_vary, null )
			dict.dive( 'xxx', $hyoo_crus_atom_vary, null )
			$mol_assert_equal( dict.keys(), [ 'xxx', 123 ] )
			$mol_assert_equal( dict.has( 123 ), true )
			$mol_assert_equal( dict.has( 'xxx' ), true )
			$mol_assert_equal( dict.has( 'yyy' ), false )
			$mol_assert_equal( dict.dive( 123, $hyoo_crus_atom_vary )!.vary(), null )
			$mol_assert_equal( dict.dive( 'xxx', $hyoo_crus_atom_vary )!.vary(), null )
			
			dict.dive( 123, $hyoo_crus_atom_vary )!.vary( 777 )
			$mol_assert_equal( dict.dive( 123, $hyoo_crus_atom_vary )!.vary(), 777 )

			dict.dive( 'xxx', $hyoo_crus_list_vary )!.items_vary([ 'foo', 'bar' ])
			$mol_assert_equal( dict.dive( 'xxx', $hyoo_crus_list_vary )!.items_vary(), [ 'foo', 'bar' ] )
			
			dict.has( 123, false )
			$mol_assert_equal( dict.keys(), [ 'xxx' ] )

		},
		
		async 'Dictionary merge'( $ ) {
			
			const land1 = $hyoo_crus_land.make({ $ })
			const land2 = $hyoo_crus_land.make({ $ })
			
			const dict1 = land1.Node( $hyoo_crus_dict ).Item('')
			const dict2 = land2.Node( $hyoo_crus_dict ).Item('')

			dict1.dive( 123, $hyoo_crus_atom_vary, null )!.vary( 666 )
			land2.faces.tick()
			dict2.dive( 123, $hyoo_crus_atom_vary, null )!.vary( 777 )
			land1.apply_unit_trust( land2.delta_unit() )
			$mol_assert_equal( dict1.dive( 123, $hyoo_crus_atom_vary )!.vary(), 777 )
			
			dict1.dive( 'xxx', $hyoo_crus_list_vary, null )!.items_vary([ 'foo' ])
			land2.faces.tick()
			dict2.dive( 'xxx', $hyoo_crus_list_vary, null )!.items_vary([ 'bar' ])
			land1.apply_unit_trust( land2.delta_unit() )
			$mol_assert_equal( dict1.dive( 'xxx', $hyoo_crus_list_vary )!.items_vary(), [ 'bar', 'foo' ] )

		},
		
		"Narrowed Dictionary with linked Dictionaries and others"( $ ) {
			
			class User extends $hyoo_crus_dict.with({
				title: $hyoo_crus_atom_str,
				account: $hyoo_crus_atom_ref_to( ()=> Account ),
				articles: $hyoo_crus_list_ref_to( ()=> Article ),
			}) {}
			
			class Account extends $hyoo_crus_dict.with({
				title: $hyoo_crus_atom_str,
				user: $hyoo_crus_atom_ref_to( ()=> User ),
			}) {}
			
			class Article extends $hyoo_crus_dict.with({
				title: $hyoo_crus_dict_to( $hyoo_crus_atom_str ),
				author: $hyoo_crus_atom_ref_to( ()=> User ),
			}) {}
			
			const realm = $hyoo_crus_realm.make({ $ })
			const land = realm.home().land()
			
			const user = land.Node( User ).Item('11111111')
			$mol_assert_equal( user.title!.val(), null )
			$mol_assert_equal( user.account!.remote(), null )
			$mol_assert_equal( user.articles!.remote_list(), [] )
			
			user.title!.val( 'Jin' )
			$mol_assert_equal( user.title!.val() ?? '', 'Jin' )
			
			const account = user.account!.remote_ensure( $hyoo_crus_rank_public )!
			$mol_assert_equal( user.account!.remote(), account )
			$mol_assert_equal( account.user!.remote(), null )
			
			account.user!.remote( user )
			$mol_assert_equal( account.user!.remote(), user )
			
			const articles = [
				user.articles!.remote_make( $hyoo_crus_rank_public ),
				user.articles!.remote_make( $hyoo_crus_rank_public ),
			]
			$mol_assert_equal( user.articles!.remote_list(), articles )
			
			articles[0].title!.key( 'en', 'auto' )!.val( 'Hello!' )
			$mol_assert_equal(
				articles[0].title!.key( 'en', 'auto' )!.val(),
				'Hello!',
			)
			$mol_assert_equal( articles[1].title?.key( 'ru', 'auto' )!.val(), null )
			$mol_assert_equal(
				articles[1].title?.key( 'ru', 'auto' )!.val(),
				null,
			)
			
			$mol_assert_unique( user.land(), account.land(), ... articles.map( article => article.land() ) )
			
		},
		
	})
	
}
