import React from "react";
import {
	List,
	ListItem,
	ListItemText,
	IconButton,
	Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";


const FavoritesList = ({ favorites, removeFromFavorites, loadFavorite, classes }) => {
	return (
		<>
			<Typography variant='h6' gutterBottom>
				Favorites:
			</Typography>
			<List sx={classes.favoritesList}>
				{favorites.map((fav, index) => (
					<ListItem key={index} sx={classes.favoriteItem}>
						<ListItemText primary={fav} />
						<IconButton onClick={() => loadFavorite(fav)}>
							{" "}
							<FavoriteIcon sx={classes.favoriteIcon} />
						</IconButton>

						<IconButton onClick={() => removeFromFavorites(fav)}>
							{" "}
							<DeleteIcon sx={classes.favoriteIcon} />
						</IconButton>
					</ListItem>
				))}
			</List>
		</>
	);
};

export default FavoritesList;
