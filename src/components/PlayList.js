import React from "react";
import TrackList from "./TrackList";

const PlayList = ({
  onNameChange,
  playListTracks,
  playListName,
  onRemove,
  onSave,
}) => {
  return (
    <>
      <div className="trackList">
        <form className="form" onSubmit={onSave}>
          <input
            id="playListName"
            type="text"
            onChange={(e) => onNameChange(e.target.value)}
            defaultValue={playListName}
            placeholder="Playlist Name"
          />
          {(playListTracks.length > 0) &&        
            <button className="btn" onClick={onSave}>
              Save to Collections
            </button>
          }
        </form>
        <TrackList
          tracks={playListTracks}
          isRemoval={true}
          onRemove={onRemove}
        />
      </div>
    </>
  );
};

export default PlayList;
